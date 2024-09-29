// src/@types/mongoose-sequence.d.ts
import { Schema } from 'mongoose';

declare module 'mongoose-sequence' {
  interface AutoIncrementOptions {
    inc_field?: string;
    // Add other options you need here
  }

  export default function AutoIncrement(schema: Schema, options?: AutoIncrementOptions): void;
}
