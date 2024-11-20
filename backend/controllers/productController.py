from flask import jsonify, request
from urllib.parse import urlparse, parse_qs
import requests
import random

from utils.commentParser import commentParser , save

class ProductController: 
    @staticmethod
    def getCommentsOfProducts():
        data = request.json
        product_url = data.get('product_url')
        if product_url is None:
            return jsonify({
                'status': 'fail',
                'status_code': 400, 
                'message': 'The link to the product is required'
            })
        
        # check if the product_url is a valid URL
        if not product_url.startswith('https://tiki.vn/'):
            return jsonify({
                'status': 'fail',
                'status_code': 400,
                'message': 'Invalid product URL from tiki.vn'
            })


        # Parse the URL
        parsed_url = urlparse(product_url)

        # Extract the product ID from the path
        product_id = parsed_url.path.split('-')[-1].split('.')[0]
        
        # remove the first 'p' in the product_id
        product_id = product_id[1:]

        # Extract query parameters
        query_params = parse_qs(parsed_url.query)

        # Get the `spid` value
        spid = query_params.get('spid', [None])[0]


        # check if the link is a valid product link
        if spid is None or product_id is None:
            return jsonify({
                'status': 'fail',
                'status_code': 400,
                'message': 'Invalid  URL, please provide a valid product URL from tiki.vn'
            })

        # tiki review api
        api_url = f"https://tiki.vn/api/v2/reviews"
        
        # query params
        params = {
            "limit": 5,
            "include": "comments,contribute_info,attribute_vote_summary",
            "sort": "score|desc,id|desc,stars|all",
            "spid": spid,
            "product_id": product_id,
            "seller_id": 1
        }

        headers = {
            "sec-ch-ua": '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        }   

        # get the total pages
        response = requests.get(api_url, headers=headers, params=params)
        total_pages = response.json().get('paging').get('last_page')


        comments = []
        random_pages = []

        # nessesary to get the comments in random order to get a good sample
        random_pages = random.sample(range(1, total_pages + 1), min(100, total_pages))
        
        # get the comments from the random pages
        for page in random_pages:
            params['page'] = page
            response = requests.get(api_url, headers=headers, params=params)
            for comment in response.json().get('data'):
                if len(comment.get('content')) > 10:
                    comments.append(commentParser(comment))

        # save the comments to data/test.csv file
        save(comments)

        if response.status_code != 200:
            return jsonify({
                'status': 'fail',
                'status_code': response.status_code,
                'message': 'Failed to fetch product comments'
            })

        return jsonify({
            'status': 'success',
            'status_code': 200,
            'total_comments': len(comments),
            'data': comments
        })