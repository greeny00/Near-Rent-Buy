import {
  context, // visibility into account, contract and blockchain details
  ContractPromiseBatch, // make asynchronous calls to other contracts and receive callbacks
  logging, // append to the execution environment log (appears in JS Developer Console when using near-api-js)
  storage,
  u128, // append to the execution environment log (appears in JS Developer Console when using near-api-js)
} from "near-sdk-as";

import { AccountId } from "../../utils";
import { Flight, flight } from "./model";

// Health Check
export function healthCheck(name: string, heart: string): string {
  storage.setString(name, heart);
  let result = storage.getString(name);
  if (result == "healthy") {
    return "Everything looks fine.";
  }
  return "Something looks wrong. Please have a detailed health check.";
}
//near call $CONTRACT healthCheck '{"name":"Zeynep","heart":"healthy"}' --accountId zzeyns.testnet
//near call $CONTRACT healthCheck '{"name":"Zeynep","heart":"no good"}' --accountId zzeyns.testnet

// Creates new flight.
export function Launching_schedule(
  text: string,
  cost: u128,
  capsul: u32,
  destination: string,
  departure: string,
  max_seat: u32
): Flight {
  return Flight.Add_Launching(
    text,
    cost,
    capsul,
    destination,
    departure,
    max_seat
  );
}

//near call $CONTRACT Launching_schedule '{"text":"Moon and Back Mission","cost":"250000","capsul":7,"destination":"Moon","departure":"İstanbul","max_seat":7}' --accountId zzeyns.testnet
//near call $CONTRACT Launching_schedule '{"text":"Survive Mission","cost":"78000000","capsul":1,"destination":"Saturn","departure":"Adana","max_seat":2}' --accountId zzeyns.testnet
//near call $CONTRACT Launching_schedule '{"text":"Sun Trip","cost":"35000","capsul":10,"destination":"Sun","departure":"Juneau","max_seat":30}' --accountId zzeyns.testnet
//near call $CONTRACT Launching_schedule '{"text":"20 minute space experince","cost":"200","capsul":100,"destination":"Exosphere","departure":"Berlin","max_seat":2000}' --accountId zzeyns.testnet
//last one for buying seat.

// Finds a flight by ID.
export function specific_flight(id: u32): Flight {
  return Flight.show_specific_flight(id);
}
//near call $CONTRACT specific_flight '{"id":1284343803}' --accountId zzeyns.testnet

// Shows all flights.
export function Show_All(): Flight[] {
  assert(
    flight.length > 0,
    "No flights to show wait for the next lunar eclipse."
  );
  return Flight.show_All();
}
//near call $CONTRACT Show_All '{}' --accountId zzeyns.testnet

//Deletes a flight by ID.
export function delete_specific(id: u32): Flight {
  return Flight.Specific_Flight(id);
}
//near call $CONTRACT delete_specific '{"id":3111645745}' --accountId zzeyns.testnet

// Delete all flights.
export function deleteall(): void {
  Flight.Delete_All();
  logging.log("Flights removed....");
}
//near call $CONTRACT deleteall '{}' --accountId zzeyns.testnet

//Updates a flight by ID.
export function Update(id: u32, updates: Flight): Flight {
  return Flight.updateinfos(id, updates);
}
//near call $CONTRACT Update '{"id":1284343803,"updates":{"text":"Moon and Back","cost":"560000","capsul":5,"destination":"Moon","departure":"İstanbul","max_seat":7}}' --accountId zzeyns.testnet

//Buying seat.
export function BuyingSeat(id: u32, passenger: AccountId): void {
  const by_seat = specific_flight(id);
  assert(by_seat.cost > context.attachedDeposit, "Your balance is not enough!");
  Flight.update_seat(id);
  logging.log(`Warning! ${context.attachedDeposit.toString()} yoktoNEAR sent`);
  ContractPromiseBatch.create(passenger).transfer(context.attachedDeposit);
}
//near call $CONTRACT BuyingSeat '{"id":2354046042,"passenger":"zzeyns.testnet"}' --accountId zzeyns.testnet
