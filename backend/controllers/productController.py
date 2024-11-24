from flask import jsonify
import torch
import time
from transformers import RobertaForSequenceClassification, AutoTokenizer


from utils.commentParser import commentParser , save
from utils.appError import AppError
from utils.tikiAPIs import TikiAPIs

class ProductController: 
    # Class attributes for model and tokenizer
    model = None
    tokenizer = None

    @classmethod
    def initialize(cls):
        if cls.model is None or cls.tokenizer is None:
            cls.model = RobertaForSequenceClassification.from_pretrained("wonrax/phobert-base-vietnamese-sentiment")
            cls.tokenizer = AutoTokenizer.from_pretrained("wonrax/phobert-base-vietnamese-sentiment", use_fast=False)

    @staticmethod
    async def getCommentsOfProducts(product_url):
        print("Fetching comments...")
        try:
            if product_url is None:
                raise AppError('Please provide a product URL from tiki.vn', 400)
            
            # check if the product_url is a valid URL
            if not product_url.startswith('https://tiki.vn/'):
                raise AppError('Invalid product URL from tiki.vn', 400)

            product_id, spid, seller_id = TikiAPIs.getIDs(product_url)

            # Estimate time to fetch comments
            start = time.time()
            comments = await TikiAPIs.fetchComments(product_id, spid, seller_id)
            end = time.time()

            print(f"Time to fetch comments: {end - start} seconds")
           
            save(comments)
            return comments
        except AppError as e:
            return jsonify(e.to_dict())  
        
    @staticmethod
    def analyzeComments(comments):
        print("Analyzing comments...")
        try:
            # Analyze the comments
            NEGs = []
            POSs = []
            NEUs = []

            with torch.no_grad():
                for comment in comments:
                    input_ids = torch.tensor([ProductController.tokenizer.encode(comment)])
                    out = ProductController.model(input_ids)
                    sentiment = out.logits.softmax(dim=-1).argmax().item()
                    if sentiment == 0:
                        NEGs.append(comment)
                    elif sentiment == 1:
                        POSs.append(comment)
                    else:
                        NEUs.append(comment)

            return NEGs, POSs, NEUs
        except Exception as e:
            raise AppError(str(e), 500)