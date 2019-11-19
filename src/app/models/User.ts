export interface UserM {
  new (ObjectId, Name, Owed, Owes, CellNo): User;
}

export interface User {
  ObjectId: String;
  Name: String;
  Owed: number;
  Owes: Map<String, number>;
  CellNo: String;

  owes_to(): Set<String>;
  owedMoney(to: String): number;
  pay(to, Money: number);
  size(): number;
  userAsDict(): Map<String, any>;
  UserfromDict(usr: Map<String, any>): User;
}

function CreateUser(ctor: UserM, ObjectId, Name, Owed, Owes, CellNo): User {
  return new ctor(ObjectId, Name, Owed, Owes, CellNo);
}

/*
  verify weather no already exists in db
  pin verification from user's cell
  returns true or false
  */
  function verifyCellNo(no): boolean {
    return true;
  }

class _User implements User {
  private __name: String;
  private __id: String;
  private __owes: Map<String, number>;
  private __owed: number;
  private __cellNo: String;

  public set Owes(owes: Map<String, number>) {
    this.__owes = owes;
  }

  public get Owes(): Map<String, number> {
    return this.__owes;
  }

  public set Owed(owed: number) {
    this.__owed = owed;
  }

  public get Owed(): number {
    return this.__owed;
  }

  public set ObjectId(id: String) {
    this.__id = id;
  }

  public get ObjectId(): String {
  
    return this.__id;
  }

  public set Name(name: String) {
    this.__name = name;
  }

  public get Name(): String {
    return this.__name;
  }

  public get CellNo(): String {
    return this.__cellNo;
  }

  public set CellNo(no: String) {
    this.__cellNo = no;
  }

  public toString(): string {
    let owes_to: string = "";
    this.__owes.forEach((money: number, to: string) => {
      owes_to += " to : " + to + "Money : " + money + "\n";
    });

    return (
      "Name : " +
      this.__name +
      "\n" +
      "Money owed : " +
      this.__owed +
      "\n" +
      "Money owes to: \n" +
      owes_to
    );
  }

  public owes_to(): Set<String> {
    return new Set(this.__owes.keys());
  }

  public owedMoney(to: String): number {
    return this.Owes.get(to);
  }

  public pay(to, Money: number) {
    let M: number = this.__owes.get(to);
    M = M - Money;
    this.__owes.set(to, M);
    if (M == 0) {
      this.__owes.delete(to);
    }
  }

  public size(): number {
    return this.__owes.size;
  }

  public userAsDict(): Map<String, any> {
    let view = new Map<String, any>();
    view.set("name", this.Name);
    view.set("owed", this.Owed);
    view.set("owes", this.Owes);
    view.set("CellNumber", this.CellNo);
    return view;
  }

  public UserfromDict(usr: Map<String, any>): User
  {
    let x = new _User();
    x.ObjectId = usr.get("_id");
    x.Name = usr.get("name");
    x.Owed = usr.get("owed");
    x.Owes = usr.get("owes");
    x.CellNo = usr.get("no");
    return x as User;
  }

  // public static isinstanceOfUser(object: any): boolean {
  //   return (
  //     "ObjectId" in object &&
  //     "Name" in object &&
  //     "Owed" in object &&
  //     "Owes" in object &&
  //     "CellNo" in object
  //   );
  // }

}
