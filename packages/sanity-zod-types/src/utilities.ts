import { z } from "zod";

export const stringDate = z
  .string()
  .transform((v) => (v?.length ? new Date(v) : undefined));
