import uuid

def get_random_code():
 code = str(uuid.uuid4())[:5].replace("-","")
 return code