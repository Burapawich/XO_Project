var WIN;
var count;
var rnt;
var player;
var e1;
var turn;
var size;
const arr = [];

function checkNumber(x) 
{
    var y = x.value;
    if(isNaN (y) || y < 3)
    {
        x.style="border:2px dashed red; color:red;";
		alert("Error minimum=3");
		document.getElementById("size").value = '3';
    }
    else
    {		
        x.style="border:2px solid #555; color:black; background-color:#E3F4FF;";
    }
}

function create_board() 
{
	//alert("F");
	e1 = document.getElementById("size");
	//alert(e1.value*e1.value);	
	player = "X";
	count = 0;
	rnt = false;
	turn = 1;
	size = e1.value*e1.value;
	
	if(e1.value == 3)
	{
		WIN=3;
	}
	else
	{
		WIN=4;
	}
	//alert(WIN);
	list = "<table class='center'>";
	for (var i = 0; i < e1.value; i++) 
	{
		list +=	"<tr>";
      	for (var j = 0; j < e1.value; j++) 
	  	{
			list +=	"<td><input type='button' class='buttons' id='xo"+i+"-"+j+"'" + " onclick='toggleXO("+i+","+j+")' value=''></td>";
     	}
	  	list += "</tr>";
    }
	list += "</table>";
	//alert("b");
	$("#board").html(list);
	document.getElementById("reset").disabled = false;
	document.getElementById("create").disabled = true;
}

function reset_board()
{
	document.getElementById("reset").disabled = true;
	document.getElementById("create").disabled = false;
	$("#board").html("");
	$("#re_board").html("");
}

function check_row()
{
	for(var i = 0; i < e1.value; i++) 
	{
		count = 0;
		for(var j = 0; j < e1.value; j++) 
		{
			if(document.getElementById("xo"+i+"-"+j).value == player)
			{
				count++;
				//alert(count);
				if(count == WIN)
				{
					rnt = true;
				}
			}
			else
			{
				count = 0;
			}
		}
	}
	return rnt;
}

function check_col()
{
	for(var j = 0; j < e1.value; j++) 
	{
		count = 0;
		for(var i = 0; i < e1.value; i++) 
		{
			if(document.getElementById("xo"+i+"-"+j).value == player)
			{
				count++;
				if(count == WIN)
				{
					rnt = true;
				}
			}
			else
			{
				count = 0;
			}
		}
	}
	return rnt;
}

function check_diagonalL()
{
	for(var b = 0; b < e1.value; b++)
	{
		//alert(b);
		for(var c = 0; c < e1.value; c++) 
		{
			//alert("C"+c);
			//alert("a "+a);
			var j=c;
			//alert(j);
			count = 0;
			for(var i=b ; i < e1.value && j < e1.value; i++) 
			{
				//alert("J@"+j);
				//alert("I"+i);
				if(document.getElementById("xo"+i+"-"+j).value == player)
				{
					count++;
					if(count == WIN)
					{
						rnt = true;
					}
				}
				else
				{
					count = 0;
				}
				j++;
			}
		}
	}
	return rnt;
}

function check_diagonalR()
{
	for(var b = 0; b < e1.value; b++)
	{
		for(var c = 0; c < e1.value; c++) 
		{
			var j = (e1.value-1)-c;
			count = 0;
			for(var i = b; i < e1.value && j >= 0; i++) 
			{
				if(document.getElementById("xo"+i+"-"+j).value == player)
				{
					count++;
					if(count == WIN)
					{
						rnt = true;
					}
				}
				else
				{
					count = 0;
				}
				j--;
			}
		}
	}
	return rnt;
}

function check_draw()
{
	count = 0;
	for(var i = 0; i < e1.value; i++) 
	{
		for(var j = 0; j < e1.value; j++) 
		{
			if(document.getElementById("xo"+i+"-"+j).value != "")
			{
				count++;
				if(count == size)
				{
					rnt = true;
				}
			}
		}
	}
	return rnt;
}

function check_WIN()
{
	if(check_row() || check_col() || check_diagonalL() || check_diagonalR())
	{
		alert("player"+player+" WIN");
	}
	
	else if(check_draw())
	{
		alert("DRAW");
	}
	
	if(rnt)
	{
		for (var i = 0; i < e1.value; i++) 
		{
			for (var j = 0; j < e1.value; j++) 
			{
				document.getElementById("xo"+i+"-"+j).disabled = true;
			}
		}
	}
}

function toggleXO(i, j) 
{
	var text_area = document.getElementById("history_turn");
	text_area.value += player+" Turn "+turn+" "+i+","+j+"\n";
	text_area.scrollTop = text_area.scrollHeight;
	
	if(player == "X")
	{
		document.getElementById("xo"+i+"-"+j).value = "X";
		document.getElementById("xo"+i+"-"+j).style.color='#FF0000';
	}
	else
	{
		document.getElementById("xo"+i+"-"+j).value = "O";
		document.getElementById("xo"+i+"-"+j).style.color='#000000';
	}
	turn++;
	//alert("TURN "+turn);
	//alert("I "+i);
	//alert("J "+j);
	
	arr.push([document.getElementById("xo"+i+"-"+j).value, i, j]);  

	check_WIN();
	player = player=="X"?"O":"X";
	
	//alert("VALUE "+document.getElementById("xo"+i+"-"+j).value);
	//alert("VALUE "+arr[turn][0]+"I "+arr[turn][1]+"J "+arr[turn][2]);
	document.getElementById("xo"+i+"-"+j).disabled = true;
	//console.log(i, j);
}

function checkturn(x) 
{
    var y = x.value;
    if(isNaN (y))
    {
        x.style="border:2px dashed red; color:red;";
		alert("Error minimum=1");
		document.getElementById("turn").value = '1';
    }
	else if(y > arr.length)
	{
		x.style="border:2px dashed red; color:red;";
		alert("Error Turn =< "+arr.length);
		document.getElementById("turn").value = '1';
	}
    else
    {		
        x.style="border:2px solid #555; color:black; background-color:#E3F4FF;";
    }
}

//function checkround(x) 
//{
//    var y = x.value;
//    if(isNaN (y))
//    {
//        x.style="border:2px dashed red; color:red;";
//		alert("Error minimum=1");
//		document.getElementById("round").value = '1';
//    }
//	else if(y > arr.length)
//	{
//		x.style="border:2px dashed red; color:red;";
//		alert("Error Round =< "+arr.length);
//		document.getElementById("round").value = '1';
//	}
//    else
//    {		
//        x.style="border:2px solid #555; color:black; background-color:#E3F4FF;";
//    }
//}

function replay_board()
{
	e2 = document.getElementById("turn");
	//alert(e2.value);
	//alert(arr.length);
	//alert(arr[e2.value][2]);

	list = "<table>";
	for (var i = 0; i < e1.value; i++) 
	{
		list +=	"<tr>";
      	for (var j = 0; j < e1.value; j++) 
	  	{
			list +=	"<td><input type='button' class='buttons' id='re_xo"+i+"-"+j+"'" + " value=''></td>";
     	}
	  	list += "</tr>";
    }
	list += "</table>";
	$("#re_board").html(list);

	for (var n = 0; n < e2.value; n++)
	{
		if(n%2==1)
		{
			document.getElementById("re_xo"+arr[n][1]+"-"+arr[n][2]).value = "O";
			document.getElementById("re_xo"+arr[n][1]+"-"+arr[n][2]).style.color='#000000';
		}
		else
		{
			document.getElementById("re_xo"+arr[n][1]+"-"+arr[n][2]).value = "X";
			document.getElementById("re_xo"+arr[n][1]+"-"+arr[n][2]).style.color='#FF0000';
		}
	}
}

function save_history()
{
	alert("a");
	var his = document.createElement("a");
	var content = document.getElementById("history_turn").value;
	var file = new Blob([content], { type: 'text/plain' });
	his.href = URL.createObjectURL(file);
	his.download = "XO_History.txt";
	his.click();
	URL.revokeObjectURL(his.href);
}