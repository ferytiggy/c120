function create_canvas(){
    canvas=createCanvas(300,300);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    classifier=ml5.imageClassifier("MobileNet",cargarmodelo);
}
function cargarmodelo(){
    console.log("modelo cargado")

}
function draw(){
    image(video,0,0,300,300);
    classifier.classify(video,got_result);
}
resultado_previo=""
function got_result(error,results){
    if (error) {
        console.error(error);
    }else{
        //solo se ejecuta si es mayor a 50% y si no es el mimso objeto
        if((results[0].confidence > 0.5) && (previous_result != results[0].label)){
            //se mandan los resultados a la consola
            console.log(results);

            previous_result = results[0].label;
            //se manda a llamar la api de la voz
            var synth = window.speechSynthesis;
            //se le manda a la api el texto que se convertira a voz, que es este object is detected + el objeto obtenido con el porcentaje de similaritud
            speak_data = 'Object detected is - '+results[0].label;
            var utterThis = new SpeechSynthesisUtterance(speak_data);
            synth.speak(utterThis);

            //se manda a una etiqueta el nombre del objeto y su porcentaje de similitud
            document.getElementById("result_object_name").innerHTML = results[0].label;
            document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}
}
