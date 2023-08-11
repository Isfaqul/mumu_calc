# Welcome to my Calculator project

## From The Odin Project

---

### Progress so far -

- ~~Styling completed~~

- **9th Aug 2023 @ 12 Noon** : Figuring out the logic for the app
- **9th Aug 2023 @ 3:58 PM** : Figured basic operations on whole numbers. However, encountered the following bugs -
  - ~~After pressing equal, it shows the results just fine.~~
  - ~~From this moment onwards, if pressed a number, it should do a fresh calculation.~~
  - ~~If pressed an operator, should continue the operation.~~
  - _In my current program, after a number is pressed, the digits concatanate with the current result on screen._
  - **9th Aug 2023 @ 7PM** : Solved the bug equal button bug
- **10th Aug 2023 @ 1:33PM** : The current issues in hand -
  - Make users use the decimal point only once
- **11th Aug 2023 @ 12:36PM** : Added show history function. But haven't been able to figure out the decimals with my current setup
- **11th Aug 2023 @ 2:16PM** : Finaly solved the decimal handler issues as follows -
  1. Used two different flags for both input A and B to track whether they have used decimal.
  2. When choosing numA/numB, check if it includes ".", if it does, set the flag for "ADecimalUsed/BDecimalUsed" to true so we know a decimal is in place. Else set it to false.
  3. As per this information, whenever decimal button is pressed, it is disabled, if decimal has been already used.
  4. In specific placed, re-enable the button, such as after operator has been pressed so as to allow numB to have a decimal. After equal has been pressed in order, after del option removes a decimal.
