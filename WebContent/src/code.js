var id_sagola={}
var last_sagola={}

function handle_click_on_station(point) {
    $("#media")
	.replaceWith(
	    '<div id="media"><div id="media_divers"></div><div id="media_img"></div><div id="media_video"></div><div id="media_benthos"></div><div id="media_pesci"></div></div>');
    
    var id = parseInt(point.id)-id_sagola[point.sagola];
    var sagola=point.sagola
    console.log("Clicked on "+sagola+' '+id);
    var m = null;
    var mapping_selected;
    

    //    j=mapping.length-id-1;
    j=last_sagola[sagola]-id;
    if (parseInt(mapping[j].id) == id) {
	m = mapping[j].media;
	mapping_selected=mapping[j];
	//	    break;
    } else {
	console.log("Non abbiamo trovato di " + id);	
    }
    
    if (m == null) {
	console.log("Non abbiamo trovato .media di " + id);
    }
    
    var divers="";
    for (i=0;i<mapping_selected.divers.length;i++){
	if (i>0) {
	    if (i==mapping_selected.divers.length-1) {
		divers+=" e ";
	    } else {
		divers+=", ";
	    }
	}
	divers+=mapping_selected.divers[i];
    }
			
    $("#info_panel_heading").html("<h4>Info su stazione #" + id+" monitorata da: "+divers+"</h4>");
    var padding_str='style="padding-top: 0  ; padding-left: 0 ; padding-right: 0 ; padding-bottom:0 ;" ';
    //			var padding_str='style="padding-top:0" ';
    /* Aggiungiamo un carousel */
    var tmp=create_media_from(mapping_selected.benthos);
    if ((typeof tmp != "undefined")&&(tmp.length!= 0)) {
	var str = create_carousel_with(tmp,"carousel_benthos");
	$("#media_benthos")
	    .replaceWith(
		'<div id="media_benthos"><div class="panel panel-transparent"><div class="panel-heading"><h4>Benthos presente</h4></div><div class="panel-body" '+padding_str+' id="img_benthos">'
		    + str + '</div></div></div>');				
    }
    
    var tmp=create_media_from(mapping_selected.pesci);
    if ((typeof tmp != "undefined")&&(tmp.length!= 0)) {
	var str = create_carousel_with(tmp,"carousel_pesci");
	$("#media_pesci")
	    .replaceWith(
		'<div id="media_pesci"><div class="panel panel-transparent"><div class="panel-heading"><h4>Pesci censiti</h4></div><div class="panel-body" '+padding_str+' id="img_pesci">'
		    + str + '</div></div></div>');
    }
    
//    if ((typeof m != "undefined")&&(m.length!=00)) {
    var str="";
    if ((typeof m != "undefined")) {
	if (m.length>0) {
	    str = create_carousel_with(m,"carousel_img");				
	}
    }
    $("#media_img")
	.replaceWith(
	    '<div id="media_img"><div class="panel panel-transparent"><div class="panel-heading"><h4>Immagini raccolte</h4></div><div class="panel-body" '+padding_str+' id="img_body">'
		+ str + '</div></div></div>');				
//    }

    str=""
    if ((typeof m != "undefined")&&(m.length!=00)) {
	str = create_lightbox_with(m);
    }
    $("#media_video")
	.replaceWith(
	    '<div id="media_video"><div class="panel panel-transparent"><div class="panel-heading"><h4>Video raccolti</h4></div><div class="panel-body" '+padding_str+' id="video_body">'
		+ str + '</div></div></div>');				
    
    
    for (var i = 0; (typeof m != "undefined") && (i < m.length); i++) {
	if (m[i].type != 'video')
	    continue;
	/*
	 * Get iframe src attribute value i.e. YouTube video url and
	 * store it in a variable
	 */
	
	var s = "#video_modal_" + i
	$(s).ready(function() {
	    var url = $("#id_video_" + i).attr('src');
	    console.log("url=" + url);
	    /*
	     * Assign empty url value to the iframe src attribute when
	     * modal hide, which stop the video playing
	     */
	    console.log("Trovato?: " + i);
	    console.log($("#video_modal_" + i));
	    
	    $(s).on('hidden.bs.modal', function(e) {
		console.log("Hello closing #id_video_" + i);
		$("#id_video_" + i).attr('src', '');
	    });
	    
	    /*
	     * Assign the initially stored url back to the iframe src
	     * attribute when modal is displayed again
	     */
	    $("#video_modal_" + i).on('shown.bs.modal', function(e) {
		console.log("show url=" + url);
		$("#id_video_" + i).attr('src', url);
	    });
	});
	
    }
    
}
function print_transetti_old() {
 var str=''	;
    str+='<div class="panel-heading" id="info_panel_heading">';
    str+='<h4>Transetti</h4>';
    str+='</div>';
    str+='<div class="panel panel-body" id="info_panel_body">';
    str+='<div id="media">';
    str+='<div class="well well-sm">';
    str+='<div class="table-responsive">';
    str+='<table class="table">';
    str+='<thead>';
    str+='<tr>';
    str+='<th>Partenza </th>';
    str+='<th>  </th>';
    str+='<th>Arrivo </th>';
    str+='<th>Direzione bussola</th>';
    str+='<th>Distanza</th>';
    str+='</tr>';
    str+='</thead>';
    str+='<tbody>';
    str+='<tr>';
    str+='<td> N 42&deg; 25.110\', E 11&deg; 4.839\' </td>';
    str+='<td> &rarr;</td>';
    str+='<td>Stazione 1</td>';
    str+='<td>160&deg;</td>';
    str+='<td>8m</td>';
    str+='</tr>';
    str+='<tr>';
    str+='<td>Stazione 1</td>';
    str+='<td> &rarr;</td>';
    str+='<td>Stazione 2</td>';
    str+='<td>120&deg;</td>';
    str+='<td>10m</td>';
    str+='</tr>';
    str+='<tr>';
    str+='<td>Stazione 2</td>';
    str+='<td> &rarr;</td>';
    str+='<td>Stazione 3</td>';
    str+='<td>130&deg;</td>';
    str+='<td>18m</td>';
    str+='</tr>';
    str+='<tr>';
    str+='<td>Stazione 3</td>';
    str+='<td> &rarr;</td>';
    str+='<td>Stazione 4</td>';
    str+='<td>130&deg;</td>';
    str+='<td>10m</td>';
    str+='</tr>';
    str+='<tr>';
    str+='<td>Stazione 4</td>';
    str+='<td> &rarr;</td>';
    str+='<td>Stazione 5</td>';
    str+='<td>150&deg;</td>';
    str+='<td>9m</td>';
    str+='</tr>';
    str+='<tr>';
    str+='<td>Stazione 5</td>';
    str+='<td> &rarr;</td>';
    str+='<td>Stazione 6</td>';
    str+='<td>150&deg;</td>';
    str+='<td>8m</td>';
    str+='</tr>';
    str+='<tr>';
    str+='<td>Stazione 6</td>';
    str+='<td> &rarr;</td>';
    str+='<td>Stazione 7</td>';
    str+='<td>150&deg;</td>';
    str+='<td>10m</td>';
    str+='</tr>';
    str+='<tr>';
    str+='<td>Stazione 7</td>';
    str+='<td> &rarr;</td>';
    str+='<td>Stazione 8</td>';
    str+='<td>150&deg;</td>';
    str+='<td>7m</td>';
    str+='</tr>';
    str+='<tr>';
    str+='<td>Stazione 8</td>';
    str+='<td> &rarr;</td>';
    str+='<td>Stazione 9</td>';
    str+='<td>120&deg;</td>';
    str+='<td>15m</td>';
    str+='</tr>';
    str+='<tr>';
    str+='<td>Stazione 9</td>';
    str+='<td> &rarr;</td>';
    str+='<td>Stazione 10</td>';
    str+='<td>110&deg;</td>';
    str+='<td>21m</td>';
    str+='</tr>';
    str+='</tbody>';
    str+='</table>';
    str+='</div>';
    str+='</div>';
    str+='</div>';
    
    $("#tabella_transetti").replaceWith(str);
}

function print_transetti() {
    var str=''	;
    str+='<div class="panel panel-transparent" id="img_transetti">';
    str+='<div class="panel panel-body"style="border-bottom-width: 20px;">';
    str+='<img src="media/argentarola/transetti_Argentarola.jpg" >';
    str+='</div>';
    str+='</div>';

    
    str+='<div class="panel-heading" id="info_panel_heading">';
    str+='<h4>Transetti</h4>';
    str+='</div>';
    str+='<div class="panel panel-body" id="info_panel_body">';
    str+='<div id="media">';
    str+='<div class="well well-sm">';
    str+='<div class="table-responsive">';
    str+='<table class="table">';
    str+='<thead>';
    str+='<tr>';
    str+='<th>Partenza </th>';
    str+='<th>  </th>';
    str+='<th>Arrivo </th>';
    str+='<th>Direzione bussola</th>';
    str+='<th>Distanza</th>';
    str+='</tr>';
    str+='</thead>';
    str+='<tbody>';
    str+='<tr>';
    str+='<td> N 42&deg; 25.110\', E 11&deg; 4.839\' </td>';
    str+='<td> &rarr;</td>';
    str+='<td>Stazione 1</td>';
    str+='<td>340&deg;</td>';
    str+='<td>8m</td>';
    str+='</tr>';
    str+='<tr>';
    str+='<td>Stazione 1</td>';
    str+='<td> &rarr;</td>';
    str+='<td>Stazione 2</td>';
    str+='<td>300&deg;</td>';
    str+='<td>10m</td>';
    str+='</tr>';
    str+='<tr>';
    str+='<td>Stazione 2</td>';
    str+='<td> &rarr;</td>';
    str+='<td>Stazione 3</td>';
    str+='<td>310&deg;</td>';
    str+='<td>18m</td>';
    str+='</tr>';
    str+='<tr>';
    str+='<td>Stazione 3</td>';
    str+='<td> &rarr;</td>';
    str+='<td>Stazione 4</td>';
    str+='<td>310&deg;</td>';
    str+='<td>10m</td>';
    str+='</tr>';
    str+='<tr>';
    str+='<td>Stazione 4</td>';
    str+='<td> &rarr;</td>';
    str+='<td>Stazione 5</td>';
    str+='<td>330&deg;</td>';
    str+='<td>9m</td>';
    str+='</tr>';
    str+='<tr>';
    str+='<td>Stazione 5</td>';
    str+='<td> &rarr;</td>';
    str+='<td>Stazione 6</td>';
    str+='<td>330&deg;</td>';
    str+='<td>8m</td>';
    str+='</tr>';
    str+='<tr>';
    str+='<td>Stazione 6</td>';
    str+='<td> &rarr;</td>';
    str+='<td>Stazione 7</td>';
    str+='<td>330&deg;</td>';
    str+='<td>10m</td>';
    str+='</tr>';
    str+='<tr>';
    str+='<td>Stazione 7</td>';
    str+='<td> &rarr;</td>';
    str+='<td>Stazione 8</td>';
    str+='<td>330&deg;</td>';
    str+='<td>7m</td>';
    str+='</tr>';
    str+='<tr>';
    str+='<td>Stazione 8</td>';
    str+='<td> &rarr;</td>';
    str+='<td>Stazione 9</td>';
    str+='<td>300&deg;</td>';
    str+='<td>15m</td>';
    str+='</tr>';
    str+='<tr>';
    str+='<td>Stazione 9</td>';
    str+='<td> &rarr;</td>';
    str+='<td>Stazione 10</td>';
    str+='<td>290&deg;</td>';
    str+='<td>21m</td>';
    str+='</tr>';
    str+='</tbody>';
    str+='</table>';
    str+='</div>';
    str+='</div>';
    str+='</div>';
    
    $("#tabella_transetti").replaceWith(str);
}

function create_carousel_with(m,id_carousel) {
	var str = '<div id="'+id_carousel+'" class="carousel slide" data-ride="carousel">';
	str += '<ol class="carousel-indicators">'
	var k = 0;
	for (var i = 0; (typeof m != "undefined") && (i < m.length); i++) {
		if (m[i].type != "img")
		    continue;
//		console.log(i + "URL:" + m[i].url);
		var active = "";
		if (k == 0) {
			active = 'class="active"';
		}
		str += '<li data-target="#'+id_carousel+'" data-slide-to="' + k + '" '
				+ active + '></li>'
		k++;
	}
	str += '</ol>'; /**/
	var k = 0;
	str += '<div class="carousel-inner" role="listbox">';
	for (var i = 0; (typeof m != "undefined") && (i < m.length); i++) {
		if (m[i].type != "img")
			continue;
		var active = "";
		if (k == 0) {
			active = 'active';
		}
	    var copyright=def_copyright
	    if ('copyright' in m[i]) {
		copyright=m[i].copyright;
	    }
		str += '<div class="item ' + active + '"><img src="' + m[i].url
				+ '" style="width:100%" alt="' + m[i].description + '">'+
				'<div class="carousel-caption"><h3>' + m[i].description + '</h3><h5>'+copyright+'</h5></div></div>';
		k++;
	}
	str += '</div>';
	/**/

	if (k != 0) {
		str += ' <a class="left carousel-control" href="#'+id_carousel+'" role="button" data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="right carousel-control" href="#'+id_carousel+'" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>';
	}
	str += "</div>";
	return str;
}
function close_url(i) {
	var s = "#video_modal_" + i
	$(s).on('hide.bs.modal', function(e) {
		console.log("Hello closing #id_video_" + i);
		$("#id_video_" + i).attr('src', '');
	});

}

function create_lightbox_with(m) {
	var str = '<div class="row">';
	str += '<div class="offset-md- 1  col-md-10">';
	var modal = "";
	var k = -1;
	for (var i = 0; (typeof m != "undefined") && (i < m.length); i++) {
		if (m[i].type != 'video')
			continue;
		k++;
		if (k % 3 == 0) {
			str += '<div class="row" >';
		}

		// var tiny = (m[i].url).replace("https://www.youtube.com/watch?v=",
		// "//i1.ytimg.com/vi/").concat("/mqdefault.jpg");
		// var tiny = (m[i].url).replace("//www.youtube.com/watch?v=",
		// "//i1.ytimg.com/vi/").concat("/mqdefault.jpg");
		var tiny = "//i1.ytimg.com/vi/" + (m[i].url) + "/mqdefault.jpg";
		str += '<div class="col-xs-4">';
		str += '<div class="thumbnail">';

		str += '<a href="#video_modal_' + i + '" data-toggle="modal">';
		str += ' <img src="' + tiny + '" class="img-fluid">';
		str += ' <div  class="caption" > ' + m[i].description + '</div>';
		str += '</a>';
		str += '</div>';
		str += '</div>';
		if (k % 3 == 2) {
			str += '</div>';
		}

		modal += ' <!-- Modal HTML -->';
		modal += '    <div id="video_modal_' + i + '" class="modal">';
		modal += '        <div class="modal-dialog">';
		modal += '            <div class="modal-content">';
		modal += '                <div class="modal-header">';
		modal += '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="close_url('
				+ i + ')">&times;</button>';
		modal += '                    <h4 class="modal-title">' + m[i].title
				+ '</h4>';
		modal += '                </div>';
		modal += '                <div class="modal-body">';
		modal += '                    <iframe id="id_video_' + i
				+ '" width="560" height="315" ';
		modal += '  src="//www.youtube.com/embed/' + m[i].url
				+ '" frameborder="0" allowfullscreen></iframe>';
		modal += '                </div>';
		modal += '            </div>';
		modal += '        </div>';
		modal += '    </div>';
		modal += '';
	}
	if (k % 3 != 2) {
		str += '</div>';
	}
	str += modal;
	return str;
}

var data = null;
var graph = null;
var max_val;
function add_station_at(x, y, z, id, data, val, sagola) {
    tmp_id=id_sagola[sagola]+id;
    console.log("val[" + id + "]=" + val);
    console.log("tmp_id : [" + tmp_id + "]" );

	if ( typeof val != "undefined" ) {
	    data.add({
		sagola : sagola,
			id : tmp_id,
			x : x,
			y : y,
			z : z,
		    style : val,
		    title: 'Stazione: '+id +'<br> Sagola: '+sagola
		});		
	}
}

/**/
function get_parameter_value_selected(mapping, pos, val) {
	//console.log("e' stato richiesto in get_parameter_value_selected il parametro "			+ val);
	return mapping[pos][val];
}

function create_media_from(node){
	var rv=[];
	for (var k in node) {
//		console.log( " key = "+k);
	    if (typeof db[k] == "undefined") {
		//--- Non e' nel db allora si prende dal node
		
		desc_ = ""+k;
		//		url_  = db[k].url ;
		url= k
		
		//		console.log("TOADD in src/db.js '"+k+"' : {url : \"media/"+k+".jpg\",description : \"Breve descrizione\" }");
//		continue
	    } else {
		desc_ = db[k].description;
		if (desc_== "Breve descrizione"){
			desc_ = ""+k;
		}
		url_  = db[k].url ;		
	    }
	    rv.push({
		type : "img",
		url : url_,
		description : desc_
	    });
	}
	return rv;
}
// Called when the Visualization API is loaded.
function drawVisualization() {
	// console.log("Disegniamo " + $("#parametro_da_graficare").val());
	// Create and populate a data table.
	data = new vis.DataSet();
    // create some nice looking data with mapping

    var orig_sagola={};
/*
    orig_sagola['S']  = {x:42.4185 , y:11.0806};
    orig_sagola['NE'] = {x:42.45889, y:11.32889};
    orig_sagola['N']  = {x:42.45   , y:11.31667};
    orig_sagola['W']  = {x:42.44139, y:11.29972};
*/
    orig_sagola['S']  = {x:42.4185 , y:11.0806};
    orig_sagola['NE'] = {x:42.45889, y:11.32889};
    orig_sagola['N']  = {x:42.45   , y:11.31667};
    orig_sagola['W']  = {x:42.44139, y:11.29972};

    id_sagola['S']=1000
    id_sagola['N']=2000
    id_sagola['NE']=3000
    id_sagola['W']=4000
    

    sagole=['N','NE','S','W']

    last_sagola['S']=0
    last_sagola['N']=0
    last_sagola['NE']=0
    last_sagola['W']=0
    
    for (var is=0; is<sagole.length;is++) {
	var sagola=sagole[is]
//	console.log('print sagola '+sagola)
	var x = orig_sagola[sagola].x;
	var y = orig_sagola[sagola].y;
//	console.log('orig '+x+' '+y)

	var first=-1
	var last=-1
	for (var i = 0; i<mapping.length ; i++) {
	    if (mapping[i].sagola != sagola) {
		continue
	    }
	    if (first==-1) {
		first=i
	    }
	    last=i
	}
    
	last_sagola[sagola]=last
	
	add_station_at(x, y, 0, mapping[last].id, data,
		       get_parameter_value_selected(mapping, 
						    (last), 
						    $("#parametro_da_graficare").val()),
		       mapping[last].sagola
		);
	for (var i = last-1; i >= first; i--) {
	    var teta = Math.PI * (180 + mapping[i].bussola) / 180.;
//	    console.log("Sagola "+sagola+"id: "+(i+1)+" teta: "+teta+" bussola: "+mapping[i].bussola);

	    var nx,ny;
//	    if (true) {
	    if (false) {
		nx = mapping[i + 1].dist * Math.cos(teta)/82853;
		ny = mapping[i + 1].dist * Math.sin(teta)/111071.7;
	    } else {
		nx = mapping[i + 1].dist * Math.cos(teta);
		ny = mapping[i + 1].dist * Math.sin(teta);
	    }
	    x = x + nx;
	    y = y + ny;
	    
//	    console.log(" (x,y) :("+x+","+y+")")
	    add_station_at(x, y, -mapping[i].depth, mapping[i].id, data,
			       get_parameter_value_selected(mapping, (i), $(
				   "#parametro_da_graficare").val()),
			       mapping[i].sagola
			      );
	}
    }
    
    function capitalize(str){
	return str.substr(0,1).toUpperCase()+str.substr(1).toLowerCase();
    }
    
    function phys_dim_of(nh) {
	if (nh=="temperatura") return "C";
	if (nh=="visibilita") return "m";
	return 'm/minuto';
    }
    function human_readable(nh,with_dim) {
	if (with_dim) {
	    return capitalize(nh.replace("_"," "))+' '+phys_dim_of(nh);
	} else {
	    return capitalize(nh.replace("_"," "));
	}

    }
	// specify options
	var options = {
		width : '600px',
		height : '600px',
		style : 'dot-color',
		showLegend : true,
	    legendLabel : human_readable($("#parametro_da_graficare").val(),true),
		showPerspective : true,
		showGrid : true,
	    showShadow : true,
	    // 
		yValueLabel : function(value) {
		    var s=Math.round( ((value/1583)+25.110)*1000)/1000;
		    return "N 42° " +s + " '" ;
		},
		xValueLabel : function(value) {
		    var s=Math.round( ((value/1583)+4.839)*1000)/1000;
		    return "E 11° " +s + " '" ;
		},
	    xLabel : "",
	    yLabel : "",
	    zValueLabel : function(value) {
		return -value;
	    } ,
	    tooltip: function (point) {
		var str= '<strong>Stazione:</strong><b> ' + (parseInt(point.data.id)-parseInt(id_sagola[point.data.sagola])) +' '+point.data.sagola+'</b><br>';
		var tipo_var=$("#parametro_da_graficare").val();
		idx=id_sagola[point.data.sagola]+last_sagola[point.data.sagola]-(parseInt(point.data.id));
		str+='<strong>'+human_readable(tipo_var,false)+':</strong> '+mapping[idx][tipo_var]+' '+phys_dim_of(tipo_var)+'<br>';
		return str;
	    },
	    // Tooltip default styling can be overridden
        tooltipStyle: {
          content: {
            background    : 'rgba(255, 255, 255, 0.7)',
            padding       : '10px',
            borderRadius  : '10px'
          },
          line: {
            borderLeft    : '0px'// dotted rgba(0, 0, 0, 0.5)'
          },
          dot: {
            border        : '0px'// solid rgba(0, 0, 0, 0.5)'
          }
        },
	    onclick : handle_click_on_station,
		keepAspectRatio : true,
		verticalRatio : 0.5
	};

	// Instantiate our graph object.
	var container = document.getElementById('map3d');
	graph = new vis.Graph3d(container, data, options);

}

function todo_onload() {
	drawVisualization();
	/* Attiva tutti i widget dei menu */
	$("#parametro_da_graficare").selectmenu({
		change : function(event, ui) {
			drawVisualization();
		}
	});
}
