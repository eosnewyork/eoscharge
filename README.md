# EOS Charge

## Query params

EOS Charge supports a number of query parameters:
- acct: the EOS account name to prepopulate
- locale: the language used (currently en or zh)
- filter: the action filter to limit the action list

Ex: https://www.eoscharge.io?acct=eosnewyorkio&locale=zh&filter=pandafuncode

## Mongo scripts
- Mongo scripts to generate data located in /mongo

## To develop locally

- git clone https://github.com/eosnewyork/eoscharge.git
- cd eoscharge 
- yarn install
- yarn start
- Mongo scripts to generate data located in /mongo
