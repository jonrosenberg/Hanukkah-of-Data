
import pandas as pd
import numpy as np

import pdb

def main():
    
    df = pd.read_csv("data/noahs-customers.csv")
    orders_df = pd.read_csv("data/noahs-orders.csv")

    orders_df = np.where(pd.DatetimeIndex(orders_df['ordered']).year == 2017)[0]
    
    pdb.set_trace()



    
if __name__ == '__main__':
    main()
