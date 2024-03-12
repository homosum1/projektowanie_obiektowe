program randomGen;

const
  SIZE = 50;
  
type
  IntArray = array[1..SIZE] of Integer;

var
//   low, high: Integer;
  randArray: IntArray;


procedure fillArrayWithRandom(var arr: IntArray; low, high: Integer);
var
  i: Integer;
begin  
  for i := 1 to SIZE do
    // arr[i] := Random(high - low + 1) + low;
    arr[i] := Random(100);
end;
  
procedure bubbleSort(var arr: IntArray);
var
  i, j, swap, temp: Integer;
begin
  for i := 1 to SIZE do
    begin
      swap := 0;

      for j := 0 to SIZE do
      begin
        if arr[j] > arr[j + 1] then
        begin
          temp := arr[j];
          arr[j] := arr[j + 1];
          arr[j + 1] := temp; 

          swap := 1;
        end;

      end;

      if swap = 0 then
        Break;

    end;
end;

procedure printArray(var arr: IntArray);
var
  i: Integer;
begin  
  for i := 1 to SIZE do
    Write(arr[i], ' ');
  Writeln;
end;

begin
//   if ParamCount <> 2 then
//   begin
//     Writeln('Nalezy podac w parametrach dolny i gorny zakres pracy programu');
//     Halt;
//   end;

//   Val(ParamStr(1), low);
//   Val(ParamStr(2), high);

//   if (low <= 0) or (high <= 0) then 
//   begin
//     writeln('Argumenty musza byc liczbami naturalnymi wiekszymi od zera');
//     Halt;
//   end;

//   if high < low then
//   begin
//     high := low;
//     Val(ParamStr(2), low);
//   end;

  Randomize;
  
//   fillArrayWithRandom(randArray, low, high);
  fillArrayWithRandom(randArray, 0, 0);

  Write('Wyloswane liczby przed sortowaniem:');
  Writeln;
  printArray(randArray);

  bubbleSort(randArray);

  Writeln;
  Write('Wyloswane liczby po sortowaniu:');
  Writeln;
  printArray(randArray);
end.

