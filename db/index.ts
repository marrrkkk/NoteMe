import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from '@/db/schema'

let connection: postgres.Sql;

if(process.env.NODE_ENV === "production"){
  connection = postgres(process.env.DB_CONNECTION_STRING!, {prepare: false});
} else {
  const globalConnection = global as typeof globalThis & {
    connection: postgres.Sql;
  };
  if(!globalConnection.connection){
    globalConnection.connection = postgres(process.env.DB_CONNECTION_STRING!, {
      prepare: false
    })
  }
  connection = globalConnection.connection;
}

const db = drizzle(connection, {
  schema,
});

export * from "@/db/schema";
export { db };