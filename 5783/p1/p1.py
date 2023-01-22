
import pandas as pd
import numpy

import pdb

def encode(name):

    if len(name) != 10:
        return None

    encoded = ''
        
    for i in name:
        if i in "abc":
            encoded += "2"
        elif i in "def":
            encoded += "3"
        elif i in "ghi":
            encoded += "4"
        elif i in "jkl":
            encoded += "5"
        elif i in "mno":
            encoded += "6"
        elif i in "pqrs":
            encoded += "7"
        elif i in "tuv":
            encoded += "8"
        elif i in "wxyz":
            encoded += "9"

    return encoded

def main():
    
    df = pd.read_csv("data/noahs-customers.csv")
    
    numbers = [x[0:3]+x[4:7]+x[8:12] for x in df["phone"].to_list()]
    
    last = []
    
    for i, name in enumerate(df['name'].to_list()):
        phone_number = numbers[i]
        last_name = name.split(" ")[-1].lower()
        encoded_name = encode(last_name)
        if encoded_name != None:
            pass
            # print(f"the {i}th row has last name: {last_name} and encoded: {encoded_name} phone:{phone_number}")
        if phone_number == encoded_name:
            print(f"{last_name}, the {i}th guy on the list, with phone number {phone_number} is the guy we are looking for")
        




    
if __name__ == '__main__':
    main()
