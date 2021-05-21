function random_item(arr)
{
	var item = arr[Math.floor(Math.random() * arr.length)];
	return item;
}

export default {
    random_item
}