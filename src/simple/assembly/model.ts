import {
  context, // visibility into account, contract and blockchain details
  PersistentUnorderedMap, // data structure that wraps storage
  math, // utility math function for hashing using SHA and Keccak as well as pseudo-random data
  logging,
  u128,
} from "near-sdk-as";

export const flight = new PersistentUnorderedMap<u32, Flight>("flight");

@nearBindgen
export class Flight {
  id: u32;
  sender: string;
  date: u64;
  cost: u128;
  capsul: u32;
  destination: string;
  departure: string;
  max_seat: u32;
  constructor(
    public text: string,
    cost: u128,
    capsul: u32,
    destination: string,
    departure: string,
    max_seat: u32
  ) {
    this.id = math.hash32<string>(text);
    this.sender = context.sender;
    this.date = context.blockTimestamp;
    this.cost = cost;
    this.capsul = capsul;
    this.destination = destination;
    this.departure = departure;
    this.max_seat = max_seat;
  }

  static Add_Launching(
    text: string,
    cost: u128,
    capsul: u32,
    destination: string,
    departure: string,
    max_seat: u32
  ): Flight {
    const newflight = new Flight(
      text,
      cost,
      capsul,
      destination,
      departure,
      max_seat
    );
    flight.set(newflight.id, newflight);
    return newflight;
  }
  //Deletes a specific flight.
  static Specific_Flight(id: u32): Flight {
    assert(
      flight.contains(id),
      "Flight could not found! Please, check ID of the flight!"
    );
    return flight.getSome(id);
  }
  //Deletes all flights.
  static Delete_All(): void {
    flight.clear();
    assert(flight.length == 0, "This was already a black hole....");
  }

  //Shows specific flight.
  static show_specific_flight(id: u32): Flight {
    let x = flight.getSome(id);
    return x;
  }

  //Shows all flights.
  static show_All(): Flight[] {
    let all = flight.length;
    let offset: u32 = 0;
    return flight.values(offset, offset + all);
  }

  //Update specific flight informations.
  static updateinfos(id: u32, updates: Flight): Flight {
    const current = this.Specific_Flight(id);
    current.capsul = updates.capsul;
    current.cost = updates.cost;
    current.date = context.blockTimestamp;
    current.departure = updates.departure;
    current.destination = updates.destination;
    current.max_seat = updates.max_seat;
    current.sender = context.sender;
    current.text = updates.text;
    flight.set(id, current);
    return current;
  }

  static update_seat(id: u32): Flight {
    const current = this.Specific_Flight(id);
    let new_seat = current.max_seat - 1;
    current.capsul = current.capsul;
    current.cost = current.cost;
    current.date = context.blockTimestamp;
    current.departure = current.departure;
    current.destination = current.destination;
    current.max_seat = new_seat;
    current.sender = context.sender;
    current.text = current.text;
    flight.set(id, current);
    return current;
  }
}
