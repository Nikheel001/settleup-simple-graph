import { User } from "./User";

export interface Graph {

}

export class _Graph {
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

  public get Name(): String {
    return this._name;
  }

  public set Name(newName: String) {
    this._name = newName;
  }

  public get Value(): Map<String, User> {
    return this._Value;
  }

  public set Value(newValue) {
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
    let i: User = this.Value.get(x);
    let M: number = i.Owes.get(y);
    M += money;
    i.Owes.set(y, M);
  }

  public process(x, y, Money) {
    if (!this.Value.has(y)) {
      return;
    }
    let ychd: Set<String> = this.Value.get(y).owes_to();

    while (ychd.size > 0) {
      ychd.forEach(yc => {
        let amt = this.Value.get(y).owedMoney(x);
        if (Money > amt) {
          let tmp = Money;
          Money = amt;
          amt = tmp;
        }
        this.Value.get(x).pay(y, Money);
        this.Value.get(y).pay(yc, Money);
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
    console.log(this.Value);
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
    let x = new _Graph();
    x.Name = graph.get("name");
    x.Value = graph.get("value");
    x.Id = graph.get("_id");
    return x;
  }

  public graphAsDict() {
    let view = new Map<String, any>();
    view.set("name", this.Name);
    view.set("value", this.Value);
  }

  public processAll() {
    this._visit_it = new Set<String>(this.Value.keys());
    this._visit_it.forEach(k => {
      if (this._visit_it.has(k)) {
        this.Value
          .get(k)
          .owes_to()
          .forEach(i => {
            this.process(k, i, this.Value.get(k).owedMoney(i));
          });
      }
    });
  }
}
