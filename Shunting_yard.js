
var inputs=[];
var Tokens=[];
var tokens_num=[];
var tokens_op=[];
var Tokens_=[];
var stack_brak=[];
var stack_p=-1;
var separators = ['\\\+', '-', '\\\(', '\\\)', '\\*', '/'];
var operators = ['+','-','*','/','(',')'];
var k=0,prev;

function decide_brak()
{
  if(stack_p == -1)
  {
    stack_brak[++stack_p] = "(";
    return '(';  
  }
  else
  {
    if(!isOperator(operators,prev))
    {  
      stack_p--;
      return ')';
    }
    else
    {
      stack_brak[++stack_p] = "(";
      return '(';
    }  
  }

}

function getinput(elem)
{   
    //Reseting Tokens on every Reload
    Tokens=[];
    tokens_num=[];
    tokens_op=[];
    Tokens_=[];
  
  if(elem=="=")
  {
     if(stack_p != -1)
      alert("Undefined Expression");
     createString();
  }
  else if(elem=="()")
  {
     elem1 = decide_brak();
     document.getElementById("display").value += elem1;
  }
  else if (elem == "(-")
  {
     document.getElementById("display").value += elem;
     stack_brak[++stack_p] = "(";
  }
  else 
  {
     document.getElementById("display").value += elem;
  }
  prev = elem;
}

 //Checks Whether input is operator or not !
function isOperator(arr,obj)
{  
   return (arr.indexOf(obj) != -1);      
}

//Localstorage and String generation.
function createString()
{ 
   
   inputs[localStorage.index_current]=document.getElementById("display").value;
   
   localStorage["inputs"] = JSON.stringify(inputs);  
   
   localStorage.index_current = Number(localStorage.index_current)+1;
   
   var Final_token = parseInput(document.getElementById("display").value);
  
   equals(Final_token);
   
}

//Parse input text and produce tokens.
function parseInput(text)
{
   tokens_num = text.split(new RegExp(separators.join('|'), 'g'));
  
    for(var i=0;i<text.length;i++)
    {
      if(isOperator(operators,text.charAt(i)))
         { 
           tokens_op.push(text.charAt(i));
          }  
     }
 //console.log(tokens_num);
 //console.log(tokens_op);
  

  var i=0;j=0
  for(var k=0;k<(tokens_num.length+tokens_op.length);)
  {
    if(tokens_op[j]!="(" || tokens_op[j]!=")")
    {
      Tokens.push(tokens_num[i]);
      k++;
      Tokens.push(tokens_op[j]);
      k++;  i++; j++;
    }
    else
    {
      Tokens.push(tokens_op[j]);
      k++;  j++;
    }
  }
  //console.log(Tokens);
  
  for(var k=0;k<Tokens.length;k++)
    {
      if( Tokens[k]!="")
       {
          Tokens_.push(Tokens[k]); 
       }
    }
    //console.log(Tokens_);


    return Tokens_;
}
 
  

//Updates screen on reload
function updateScreen()
{  // alert("aok!");
    document.getElementById("display").value= "";
    if (!localStorage.index_current)   
     {
      localStorage.index_current = 0;
     }
}

//Clears all inputs
 function clear_all()
 {
   document.getElementById("display").value = "";  
   stack_p = -1;
  }


//Shunting Yard algorithm 

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
 
 //Calculation Starts here.
function shuntCalculation ( t )
{
var ops = "";
var i;
var stack_oper = Array (); //stack for operators
var stack_oper_p = 0;
 
var stack_num = Array ();
var stack_num_p = 0;
 
 
for( i=0; i<t.length-1 ; i++)
{
   if ( t[i] == '(' ) // push ( to stack for operators
   {
     stack_oper[stack_oper_p++] = t[i];
     if(t[i+1] == '-')
     {
       t[i+2] = -t[i+2];
       i++;
     }
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

function equals(Final_Token)
{
    document.getElementById("display").value = shuntCalculation( Final_Token) ;
}

window.onload=updateScreen;
