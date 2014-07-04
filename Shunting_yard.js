function getinput(elem)
{
  //var io;
  //alert(elem.value);
  //io = document.getElementById(id).value;
  document.getElementById("display").value += elem;
}

function clear_all()
{
   document.getElementById("display").value = "";  
}

// s is array for stack, sp is stack pointer, t is operator
function calcstacknum( s , sp , t )
{
  if ( t == '+' )
  {
    s[sp-2] = Number( s[sp-2] ) + Number( s[sp-1] );
  }
  else   if ( t == '-' )
  {
    s[sp-2] = Number( s[sp-2] ) - Number( s[sp-1] );
  }
  else   if ( t == '*' )
  {
    s[sp-2] = Number( s[sp-2] ) * Number( s[sp-1] );
  }
  else   if ( t == '/' )
  {
    s[sp-2] = Number( s[sp-2] ) / Number( s[sp-1] );
  }
 // all operations, pop 2 items from stack then operate then push result back to stack
 
  return sp - 1 ;
}
 
function shuntcalc ( t )
{
var ops = "";
var i;
var stack_oper = Array (); //stack for operators
var stack_oper_p = 0;
 
var stack_num = Array ();
var stack_num_p = 0;
 
 
for( i=0; i<t.length ; i++)
{
   if ( t[i] == '(' ) // push ( to stack for operators
   {
     stack_oper[stack_oper_p++] = t[i];
   }
   else if ( t[i] == ')' ) // pop stack for operators until found ( but not show (
   {
      while ( stack_oper_p > 0 )
      {
         if ( stack_oper[--stack_oper_p] != '(' )
         {
          stack_num_p = calcstacknum ( stack_num , stack_num_p , stack_oper[stack_oper_p] );
         }
      }
   }
   else if ( t[i] == '+' || t[i] == '-' || t[i] == '*' || t[i] == '/'  )
   {
     if ( stack_oper_p > 0 )
     {
        if (( t[i] == '+' || t[i] == '-' ) && ( stack_oper[ stack_oper_p - 1 ] != '(' ))
        {
          --stack_oper_p;
          stack_num_p = calcstacknum ( stack_num , stack_num_p , stack_oper[stack_oper_p] );
 
        }
     }
     // push that operator to stack for operators
     stack_oper[stack_oper_p++] = t[i];
   }
   else // assume number, take it to output
   {
     stack_num[stack_num_p++] = t[i];
   }
}
 
 
// pop all in stack for operators
while ( stack_oper_p > 0 )
{
   --stack_oper_p;
   stack_num_p = calcstacknum ( stack_num , stack_num_p , stack_oper[stack_oper_p] );
}
 
 
return stack_num[0];
 
}

function equals()
{
    var arr = ['3','+','24','*','6','/','(','2','-','8',')','+','12'];
    document.getElementById("display").value = shuntcalc( arr ) ;
}


