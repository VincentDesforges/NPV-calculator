# NPV calculator

The NPV calculator is a small app designed to help you quickly compute the net present value of your favourite stocks. This may be helpful for anyone wanting to calculate the fair value of a given stock.

## Setup
Once you have the project file on your computer make sure to run
```
npm install
```
to install all the required dependancies.

You will also need to create a config.json file in the config folder and fill in the following fields: --- XXXX
```
{
  "constants": {
    "DISCOUNT_RATE": XX,
    "TIME_HORIZON": XX
  },
  "testConstants": {
    "DISCOUNT_RATE": 10,
    "TIME_HORIZON": 10
  }
}
```
I made this file private in case you prefer to keep your assumptions to yourself!

## A few notes on parameter selection
The choice of parameters use when running the program will have a significant impact on the end result and as a consequence it is bester to stay on the conservative side:
* Time horizon: --- XXX
* Discount rate: For this value a higher number is more conservative. Cash today is worth a lot more than cash tomorrow!

## Notes on the different models
Explain reasoning for the three/more models and detail implementation... XXX

## Disclaimer
I wrote this code primarily for fun and also to help myself out when selecting stocks. I cannot guarranty the soundess of the calculations, or whether it would result in any impovement in investment performance.

Please do not make investment decisions on this tool alone. Many factors relevant to a company's suitability as an investment are not considered in this calculation (e.g. debt levels, management, sector trends...).

## Thanks!
Feel free to copy this and improve upon it!
