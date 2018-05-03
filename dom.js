var dom = function(storage_name)
{
	//console.log('this ', this.localStorage)

	//localstorage name
	//var newArray = storage_name.slice();
	var dom = storage_name; 
	//for to speed up things store in js dom storage inaddition to localstorage
	//var dom; 

	var check_typeof = function (val) 
	{
		var str = typeof(val);			   
				 
		if( Array.isArray(val))
		{ 
			return 'array';
		} 
		else if(str === "object")
		{
			return 'object';		 
		}		
		else 
		{
			return str;
		} 
		 
	};

	var size = function (collection) 
	{ 
		var str = check_typeof(collection);

		if(str ==="number" || str ==="string")
		{
		  var d1 = str.toString()
		  return collection.toString().length; 
		}

		else if(str ==="object")
		{ 
			var i =0;
			for (ele in collection) {  i++;	};				 
			return i;
		} 
		else if( str ==="array")
		{
			var i =0;
			collection.forEach( function(element, index){i++;});	 
			return i;
		}    
	};
	var auto_id = function (len) 
	{  
		return Math.random().toString(36).substr(2,len) ;
	};

	var findobj = function(obj, lookup_id)
	{
		for (var prop in obj)
		{ 
			if (obj.hasOwnProperty(prop))
			{
				if ( prop == lookup_id)
				{
					return {id:prop, val: obj[lookup_id],};
				}
			}
		}
	};

	var select = function(lookup)
	{
		if(size(dom) > 0) 
		{
			var val =  dom; 		
			var data_type = check_typeof(val);
			var collection = val; 

			if(check_typeof(lookup) == 'array')
			{
				if(data_type == 'array')
				{
					var a1 = [];
					object = {};					 
					collection.forEach( function(v1, i1) 	
					{
						
						lookup.forEach( function(v2, i2) 					
						{  
							object[v2] = v1[v2];							 
						});
						//add the row
						a1.push(object);
						//clear row for next row to be added
						object={};						
					});				 
					return a1; 
				}
			}
		}
	};

	var get = function(lookup)
	{ 
		if(size(dom) > 0) 
		{
			var val =  dom; 		
			var data_type = check_typeof(val);
			var collection = val;

			if(check_typeof(lookup) == 'string')
			{			
				if(data_type == "object")
				{
					var d = findobj(collection, lookup);
					if(size(d) > 0)
					{
						return d.val;
					}
				}
			}
			if(check_typeof(lookup) == 'object')
			{  
				var all_rows = [];
				collection.map(function(ele)
				{	  
					var a ;
					for(var k1 in lookup)
					{	
						var obj_k1 = k1;
						var obj_v1 = lookup[k1];

						if(size(findobj(ele, obj_k1)) > 0)
						{
							var d = findobj(ele, obj_k1).id;
							if( ele[d] == lookup[k1])
							{
								a = ele;
							}
						}
					}
					if(a)
					{
						all_rows.push(ele);
					}
				}); 
				if(size(all_rows) > 0)
				{
					return all_rows;
				}
			}
		} 
	};

	var add = function(append_val)
	{ 
		if(size(dom) > 0)
		{
			var val =  dom; 		
			var data_type = check_typeof(val);
			var collection = val;
			
			if(data_type =='object' )
			{
				for(k1 in append_val)
				{
					collection[k1] = append_val[k1];
				}
				//update collection				  
				return collection;
			}
			if(data_type =='array')
			{

				if(check_typeof(append_val) == 'object')
				{
					collection.push(append_val);
				}
				else if(check_typeof(append_val) == 'array')
				{
					append_val.forEach( function(ele, i1) 
					{
						collection.push(ele);
					});
				}
				//update collection
				return collection;
			}
		}
	};
	var update = function(updateObjval, whereobj)
	{	
		if(size(dom) > 0)
		{
			var val =  dom; 		
			var data_type = check_typeof(val);
			var collection = val; 
			if(data_type == "object")
			{ 
				for (var k1 in updateObjval)
				{
					var obj_k1 = k1;
					var obj_v1 = updateObjval[k1];

					if(size(findobj(collection, obj_k1)) > 0)
					{
						var d = findobj(collection, obj_k1).id;
						collection[d] = obj_v1; 
					}
				}
				//update storage				
				return collection;
			}
			else if(data_type == "array")
			{
				var val_updated = [];
				collection.map(function(v1)
				{	
					for( k1 in whereobj)
					{	
						var obj_k1 = k1;
						var obj_v1 =  whereobj[k1];
						var d = findobj(v1, obj_k1).id;
						if(size(d) > 0)
						{						
							if(v1[d] == obj_v1)
							{
								for(var k2 in updateObjval)
								{
									var obj_k2 = k2;
									var obj_v2 =  updateObjval[k2];
									
									if( v1[obj_k2])
									{
										v1[obj_k2] = obj_v2;
									}
								}														
								val_updated.push(v1);
							}
						}
					}
				});
				//update storage
				return val_updated;			
			}
		}
	};

	var remove = function(whereobj)
	{		
		if(size(dom) > 0)
		{
			var val =  dom; 		
			var data_type = check_typeof(val);
			var collection = val; 

			if(data_type == "object")
			{
				for(var k1 in whereobj)
				{	
					var obj_k1 = k1;
					var obj_v1 = whereobj[k1];
					if(collection[k1] == whereobj[k1])
					{
						delete collection[k1];
					}
				}
				
				//update  
				return collection;			
			}
			else if(data_type == "array")
			{			 
				collection.map(function(v1, i1)
				{	 
					for( k1 in v1)
					{	
		 				for(k2 in whereobj) 
		 				{
		 					if(k1 == k2)
		 					{
		 						if(v1[k1] == whereobj[k2])
		 						{	 							
		 							delete collection[i1]
		 						}
		 					}
		 				}
					}	 
				});
				var a1 = [];
				collection.forEach( function(ele, index) 
				{	
					//will remove empty array(s)
					if(ele)
					{
						a1.push(ele);
					}
				});		
				//update  
				return a1;
			}
		}
	}; 
	 

	var results = 
	{	
		select:select, 
		get:get,
		add:add,
		update:update,
		remove:remove,	 
	};

	return results; 
};