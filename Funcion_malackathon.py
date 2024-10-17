import pandas as pd
import numpy as np 
import seaborn as sns
import matplotlib.ticker as mtick
import matplotlib.pyplot as plt 

embalses_relacion = pd.read_csv ("C:/Users/Ana/Downloads/Relacion_embalses.csv")
agua = pd.read_csv ("C:/Users/Ana/Downloads/agua.csv")
todo = pd.read_csv ("C:/Users/Ana/Downloads/todo_junto.csv")
embalses = pd.read_csv ("C:/Users/Ana/Downloads/embalsesUTF8.csv")

embalses_relacion ['X'] = embalses_relacion ['X'].replace (',', '.', regex=True)
embalses_relacion ['Y'] = embalses_relacion ['Y'].replace (',', '.', regex=True)


df = pd.merge (embalses, agua, on='ID', how='inner')
todo ['FECHA'] = pd.to_datetime (todo['FECHA'], format='%d/%m/%y %H:%M')

#Esta función nos dice, dadas las coordenadas de un determinado embalse y 
#un numero concreto N de semanas, la media de la cantidad de agua de ese embalse
#en las últimas N semanas

epsilon = 1e-7
def mediaagua (x, y, N):
    coincidencia = embalses_relacion[(embalses_relacion['X'].astype(float)== x) & (embalses_relacion['Y'].astype(float)== y)]
    if coincidencia.empty:
        print ('Las coordenadas no pertenecen a ningún embalse')
        return 
    else:
        iden = coincidencia['ID_INT'].mean()
        seleccion = todo [todo ['ID'] == iden]
        df_ord = seleccion.sort_values (by = 'FECHA')
        return df_ord.tail(N)['AGUA_ACTUAL'].mean ()

