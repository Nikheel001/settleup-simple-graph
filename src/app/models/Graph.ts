import { User } from "./User";

export class Graph {
  private _value: Map<String, User>;
  private _id: String;
  private _name: String;
  private _visit_it: Set<String>;

  constructor() {
    this._id = "";
    this._name = "";
    this._value = new Map<String, User>();
    this._visit_it = new Set<String>();
  }

  public get name(): String {
    return this._name;
  }

  public set name(newName: String) {
    this._name = newName;
  }

  public get value(): Map<String, User> {
    return this._value;
  }

  public set value(newValue) {
    newValue.forEach((i, j) => {
      if (!(j instanceof User)) {
        console.log("Invalid Value");
        return;
      }
    });
    this._value = newValue;
  }

  public set Id(Id: String) {
    this._id = Id;
  }

  public get Id(): String {
    return this._id;
  }

  public transaction(x, y, money) {
    let i: User = this.value.get(x);
    let M: number = i.Owes.get(y);
    M += money;
    i.Owes.set(y, M);
  }

  public process(x, y, Money) {
    if (!this.value.has(y)) {
      return;
    }
    let ychd: Set<String> = this.value.get(y).owes_to();

    while (ychd.size > 0) {
      ychd.forEach(yc => {
        let amt = this.value.get(y).owedMoney(x);
        if (Money > amt) {
          let tmp = Money;
          Money = amt;
          amt = tmp;
        }
        this.value.get(x).pay(y, Money);
        this.value.get(y).pay(yc, Money);
        if (yc != x) {
          this.transaction(x, yc, Money);
          if (!this._visit_it.has(yc)) {
            this._visit_it.add(yc);
          }
        }
      });
    }
  }

  public showNetwork() {
    console.log(this.value);
  }

  public clearGraph() {
    let nodes = new Set(this._value.keys());
    let marked = new Set<String>();
    nodes.forEach(i => {
      if (this._value.get(i).size() == 0) {
        marked.add(i);
      }
    });

    marked.forEach(m => {
      nodes.delete(m);
    });
  }

  public static fromDict(graph) {
    let x = new Graph();
    x.name = graph.get("name");
    x.value = graph.get("value");
    x.Id = graph.get("_id");
    return x;
  }

  public graphAsDict() {
    let view = new Map<String, any>();
    view.set("name", this.name);
    view.set("value", this.value);
  }

  public processAll() {
    this._visit_it = new Set<String>(this.value.keys());
    this._visit_it.forEach(k => {
      if (this._visit_it.has(k)) {
        this.value
          .get(k)
          .owes_to()
          .forEach(i => {
            this.process(k, i, this.value.get(k).owedMoney(i));
          });
      }
    });
  }
}
