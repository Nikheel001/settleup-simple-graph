class Person
{
  private __name:String;
  private __id:String;
  private __owes:Map<String, Number>;
  private __owed:Number;

  public setOwes(owes: Map<String, Number>):void {
    this.__owes = owes;
  }

  public getOwes():Map<String, Number> {
    return this.__owes;
  }

  public setOwed(owed: Number):void{
    this.__owed = owed;
  }

  public getOwed():Number {
    return this.__owed;
  }

  public setId(id :String ):void {
    this.__id = id;
  }

  public getId():String{
    return this.__id;
  }

  public setName(name:String):void {
    this.__name = name;
  }

  public getName():String{
    return this.__name;
  }
}