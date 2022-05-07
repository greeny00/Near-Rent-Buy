# Dream Flight DAap

With this project, it was aimed to collect space expeditions on one page, to enable users to access all flight information easily, and to reserve a seat for their desired flight using their NEAR wallet.

## Loom Video

https://www.loom.com/share/9239095038814a6fad067699b82f371f

## How To Use

First of all, the repo should be cloned or the files should be downloaded to the computer as ZIP from the code section above.

After this step, enter the following commands using a suitable compiler.(This tutorial is made for gitbash here. But with minor punctuation differences, almost all compilers follow the same steps.)

1)Command that downloads all packages that the project will use:

```ts
yarn;
```

2)The command that introduces the contract to the compiler and creates our wasm file:

```ts

yarn build:release
```

3)To deploy the project:

```ts

near dev-deploy ./build/release/simple.wasm
```

4)An account ID is created with the deployment of the project. This ID appears as "dev-...........".Copy and paste this ID into <Account ID>. With this step, you will not need to enter account id every time.(Please write without "<,>"these characters.)

```ts

export CONTRACT=<AccountId>
```

5)This step is not mandatory. It helps you to test the correctness of the entered accountId.

```ts

echo $CONTRACT
```

After all these steps, you can now switch to using the functions.

## Functions

1-Health Check
With this function, it is checked whether the user has the necessary health to fly. Is a simple dictionary function. The first entry the key is set as the name, and the second entry is set as the health status. If a value other than "healthy" is entered, the function will inform you that you are not available for this flight.
How to call:

```ts

near call $CONTRACT healthCheck '{"name":"NAME","heart":"healthy"}' -accountId <YOUR TESTNET ACCOUNT>
```

2-Launching Schedule
This function notifies the system of a new flight with the information it receives from the user.
How to call:

```ts

near call $CONTRACT Launching_schedule '{"text":"Moon and Back Mission","cost":"250000","capsul":7,"destination":"Moon","departure":"İstanbul","max_seat":7}' --accountId <YOUR TESTNET ACCOUNT>
```

3-specific_flight
This function displays the Id information received from the user and the rest of the flight that has that ID.
How to call:

```ts

near call $CONTRACT specific_flight '{"id":<FLİGHT ID HERE>}' --accountId <YOUR TESTNET ACCOUNT>
```

4-Show_All
This function does not receive any information from the user, when called, it displays all the flights available on the site.
How to call:

```ts

near call $CONTRACT Show_All '{}' --accountId <YOUR TESTNET ACCOUNT>
```

5-delete_specific
Deletes the flight associated with that id from the system with the id information it receives from the user.
How to call:

```ts

near call $CONTRACT delete_specific '{"id":<FLİGHT ID HERE>}' --accountId <YOUR TESTNET ACCOUNT>
```

6-deleteall
This function does not receive any information from the user, when called, it deletes all the flights available on the site.
How to call:

```ts

near call $CONTRACT deleteall '{}' --accountId <YOUR TESTNET ACCOUNT>
```

7-Update
This function updates the flight information associated with the id sent to the function with the information in the second parameter received by the function. In the second parameter, you need to re-enter the information you want to remain the same. The information you enter must be in the desired order. As a result of this operation, the id does not change.
How to call:

```ts

near call $CONTRACT Update '{"id":<FLİGHT ID HERE>,"updates":{"text":"Moon and Back","cost":"560000","capsul":5,"destination":"Moon","departure":"İstanbul","max_seat":7}}' --accountId <YOUR TESTNET ACCOUNT>
```

8-BuyingSeat
This function works with the id and passenger id sent to the function. For the transaction to take place, you must have a balance equal to or greater than the seat fee stated in your NEAR wallet. If you have the balance to buy a seat after this check, the number of seats on the flight will be reduced by one.
How to call:

```ts

near call $CONTRACT BuyingSeat '{"id":<FLİGHT ID HERE>,"passenger":"<YOUR TESTNET ACCOUNT>"}' --accountId <YOUR TESTNET ACCOUNT>
```
