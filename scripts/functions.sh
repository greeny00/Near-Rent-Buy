# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Step 1: Build the contract (may take a few seconds)"
echo ---------------------------------------------------------
echo

yarn build:release

echo
echo
echo ---------------------------------------------------------
echo "Step 2: Deploy the contract"
echo ---------------------------------------------------------
echo

# comment the line below to deploy the contract
near dev-deploy ./build/release/simple.wasm

echo
echo
echo ---------------------------------------------------------
echo "Step 3: Prepare your environment for next steps"
echo ---------------------------------------------------------
echo 'export CONTRACT=<dev-123-456>'
echo

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable"
[ -z "$MY_ACC" ] && echo "Missing \$MY_ACC environment variable"

[ -z "$CONTRACT" ] && echo "Please \export your account id to the \$CONTRACT variable!"
[ -z "$CONTRACT" ] && echo "export CONTRACT=__new_contract_account_id__"

[ -z "$MY_ACC" ] && echo "Please \export your account id to the \$MY_ACC variable!"
[ -z "$MY_ACC" ] && echo "export MY_ACC=__your_account_name__"

echo ---------------------------------------------------------
echo "Step 1: Call 'healthCheck' functions on the contract"
echo ---------------------------------------------------------
echo "near call $CONTRACT healthCheck '{"name":"NAME","heart":"healthy"}' --accountId $MY_ACC"
echo 
echo

echo ---------------------------------------------------------
echo "Step 2: Call 'Launching_schedule' functions on the contract"
echo ---------------------------------------------------------
echo "near call $CONTRACT Launching_schedule '{"text":"Moon and Back Mission","cost":"250000","capsul":7,"destination":"Moon","departure":"İstanbul","max_seat":7}' --accountId $MY_ACC"
echo 

echo ---------------------------------------------------------
echo "Step 3: Call 'specific_flight' functions on the contract"
echo ---------------------------------------------------------
echo "near call $CONTRACT specific_flight '{"id":2354046042}' --accountId $MY_ACC"
echo 

echo
echo ---------------------------------------------------------
echo "Step 4: Call 'Show_All' functions on the contract"
echo ---------------------------------------------------------
echo "near call $CONTRACT near call $CONTRACT Show_All '{}' --accountId $MY_ACC"
echo 

echo
echo ---------------------------------------------------------
echo "Step 5: Call 'delete_specific' functions on the contract"
echo ---------------------------------------------------------
echo "near call $CONTRACT delete_specific '{"id":1284343803}' --accountId $MY_ACC"
echo 

echo
echo ---------------------------------------------------------
echo "Step 6: Call 'deleteall' functions on the contract"
echo ---------------------------------------------------------
echo "near call $CONTRACT deleteall '{}' --accountId $MY_ACC"
echo 

echo
echo ---------------------------------------------------------
echo "Step 7: Call 'Update' functions on the contract"
echo ---------------------------------------------------------
echo "near call $CONTRACT Update '{"id":3111645745,"updates":{"text":"Moon and Back","cost":"560000","capsul":5,"destination":"Moon","departure":"İstanbul","max_seat":7}}' --accountId $MY_ACC"
echo 

echo
echo ---------------------------------------------------------
echo "Step 8: Call 'BuyingSeat' functions on the contract"
echo ---------------------------------------------------------
echo "near call $CONTRACT BuyingSeat '{"id":2354046042,"passenger":"zzeyns.testnet"}' --accountId $MY_ACC"
echo 

echo


exit 0