const dish_req = (res) => {
    let data = res.meals[0];
    $("#thumb").attr("src", data.strMealThumb);
    $("#name").html(`${data.strMeal}`);
    $("#category").html(`Category: ${data.strCategory}`);
    $("#area").html(`Area: ${data.strArea}`);

    const ingredients = [];
    for(let i = 1; i <=20; i++) {
      let ingredient = data[`strIngredient${i}`].charAt(0).toUpperCase() + data[`strIngredient${i}`].slice(1);
      let measure = data[`strMeasure${i}`];
      measure == '' ? measure = "For Your Need" : "";
      ingredient !== '' && ingredient !== null ? ingredients.push({ ingredient, measure }) : "";
    };

    let out = ""
    ingredients.map(str => {
        out += `~ ${str.ingredient} ( ${str.measure} )<br />`
    })


    $("#tags").html(`Tags: ${data.strTags ? data.strTags.split(",").join(", ") : "Empty"}`);
    $("#ins").html(data.strInstructions);
    $("#ingredients").html(out);
};

$.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/random.php",
    type: 'GET',
    dataType: 'json',
    success: async (res) => {await dish_req(res)}
});

const refresh = () => {
    $("#refresh").html('<i class="fa fa-circle-o-notch fa-spin"></i>')
    $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/random.php",
        type: 'GET',
        dataType: 'json',
        success: async (res) => {
            await dish_req(res);
            $("#refresh").html('<i class="fas fa-redo"></i>');
        }
    });
};