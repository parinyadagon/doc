import bcrypt from "bcrypt";

export class Hasher {
  public static hashPassword(password: string): string {
    const sault = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, sault);
  }

  public static comparePassword(password: string, hashPassword: string): boolean {
    return bcrypt.compareSync(password, hashPassword);
  }
}
