import pandas as pd
import pprint
import requests

file = "台北市.csv"
pp = pprint.PrettyPrinter(indent=4)

df = pd.read_csv('C:/Users/lauchiwai/Desktop/' +
                 file, encoding="utf-8-sig")
#df = pd.read_csv('C:/Users/USER/Desktop/吃什麼 資料更新/9折神卷正確/' + file, encoding = "utf-8-sig")

dataList = []
dataList = df.values.tolist()
# pp.pprint(data[0][1])
for data in dataList:
    json = {
        "shopname": data[1],
        "star": data[2],
        "type": data[3],
        "date": data[4].replace('\r', ''),
        "address": data[6],
        "phone": data[7],
        "area": data[24],
        "popular": data[10],
        "city": "台北市"
    }
    # pp.pprint(json)
    url = "http://127.0.0.1:3007/api/creatShopFromCSV"
    res = requests.post(url, json=json)
    pp.pprint("商店建立" + res.text)
# for d in data :
