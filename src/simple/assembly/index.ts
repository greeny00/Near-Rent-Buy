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

// Finds a flight by ID.
export function specific_flight(id: u32): Flight {
  return Flight.show_specific_flight(id);
}

// Shows all flights.
export function Show_All(): Flight[] {
  assert(
    flight.length > 0,
    "No flights to show wait for the next lunar eclipse."
  );
  return Flight.show_All();
}

//Deletes a flight by ID.
export function delete_specific(id: u32): Flight {
  return Flight.Specific_Flight(id);
}

// Delete all flights.
export function deleteall(): void {
  Flight.Delete_All();
  logging.log("Flights removed....");
}

//Updates a flight by ID.
export function Update(id: u32, updates: Flight): Flight {
  return Flight.updateinfos(id, updates);
}

//Buying seat.
export function BuyingSeat(id: u32, passenger: AccountId): void {
  const by_seat = specific_flight(id);
  assert(by_seat.cost > context.attachedDeposit, "Your balance is not enough!");
  Flight.update_seat(id);
  logging.log(`Warning! ${context.attachedDeposit.toString()} yoktoNEAR sent`);
  ContractPromiseBatch.create(passenger).transfer(context.attachedDeposit);
}
