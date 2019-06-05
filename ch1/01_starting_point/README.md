# Refactoring 2nd Edition - Chapter 1

## 01 - Starting Point
- Page 2-3

## 02 - Decomposing switch Statement
- Page 6-10
- using `extract function`, `rename variable`, `rename parameter`

## 03 - Removing The play Variables
- Page 10-14
- using `replace temp with query`, `inline variable`, `change function declaration`

## 04 - Extracting Volume Credits
- Page 14-16
- using `extract function`, `rename variable`, `rename parameter`

## 05 - Remove the format Variable
- Page 16-18
- using `extract function`, `change function declaration`

## 06 - Remove Total Volume Credits
- Page 18-22
- using `split loop`, `slide statements`, `extract function`, `inline variable`, `rename variable`

## 07 - Status: Lots of Nested Functions
- Page 22-23

## 08 - Splitting the Phases of Calculation and Formatting
- Page 24-33
- using `split phase`, `extract function`, `change function declaration`, `move function`, `replace loop with pipeline`

## 09 - Reorganizing the Calculations by Type
- Page 35-43
- using `change function declaration`, `moving function`, `inline function`, `replace type code with subclasses`, `eplace constructor with factory function`, `replace conditional with polymorphism`

## Sidenote
1. A good practice to always call the return value from a function as `result`. That way, you always know its role.

2. With a dynamically typed language such as _Javascript_, it's useful to keep track of types--hence, your defdault name for a parameter includes the type name.

## How-to-use
1. **How to use `Extract Function`:**
- need to look in the fragment for any variables that will no longer be in scope once you extracted the code into its own function
- For non-modified variables, you could set it as **parameters**
- For modified variables, you could set it on the outside/variable inside the new function (PS: need more care on this one!)


2. **How to use `rename variable` and `rename parameter`:**
- Good practice to use **find and replace** feature on your IDE
- Make sure that you only replace on the appropriate variable/parameter


3. **How to use `replace temp with query`:**
- which mean that, instead of introduction a temporary variable, we directly retrieve the value from a function and parse it to the designated function
- don't forget to compile-test-commit, and then delete the unused parameter


4. **How to use `inline variable`:**
- Reduce the usage of creating a new variable which only being used once.
- Instead of call a function and then put it into a variable, just call the function as a parameter of the related function
- Good practice is by using *find and replace function* from your IDE
- make sure that the variable's colour that you refactored gray (VS Code); which means that it is not being used anymore.
- don't forget to compile-test-commit, and then delete the unused parameter


5. **How to use `change function declaration`:**
- The idea is to reduce/change the total number of parameters of a particular function
- Could do by using it together with `replace temp with query`
- So, instead of parsing another parameter, it could be done by calling a query function with is using the other parameter to achieve same result
- It also applicable if you want to rename the function name for clarity purpose


6. **How to use `split loop`:**
- separate a single large loop into a multiple small loop


7. How to use `slide statements`:
- move the relevant variable into nearby the affecting line of codes
- gathering together everything makes it easier to do `replace temp with query`


8. **How to use `split phase`:**
- to divide the logic into 2 parts: 1) to calculate the data required for the statement, 2) renders it into text on HTML
- cooperate with `extract function`


9. **How to use `replace loop with pipeline`:**
- move several line of codes into a function
- move that function into a separate file
- good practice to also move the dependence functions into that separate file (should be really careful! Use your IDE to identify whether that dependence function still being used by another function on that file or not)


10. **How to use `change function declaration`:**
- the goal is to move a particular function into another site (i.e. into a class)

11. **How to use `moving function`:**
- copt the logic over to its new context
- adjust the code to fit into its new home
- change several declaration that affected with this changes

12. **How to use `replace type code with subclasses`:**
- the idea is to introduce a subclasses instead of the type code
- since Javascript can't result subclasses, we use `replace constructor with factory function`
- extend a class from the parent class

13. **How to use `replace constructor with factory function`:**
- the idea is to introduce a function instead of the type code

14. **How to use `replace conditional with polymorphism`:**
- the idea is to use polymorphism instead of conditional statement
- instead of using switch to create logic-- use subclass