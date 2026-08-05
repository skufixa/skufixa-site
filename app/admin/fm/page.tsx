"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";

type FMItem = {
  id: number;
  image_url: string;
};


export default function AdminFMPage() {

  const [items, setItems] = useState<FMItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);



  async function loadItems() {

    try {

      const response =
        await fetch("/api/fm");


      const data =
        await response.json();


      if (!response.ok || !Array.isArray(data)) {

        setMessage(
          "Не удалось загрузить скрины"
        );

        return;
      }


      setItems(data);


    } catch {

      setMessage(
        "Ошибка загрузки"
      );

    }

  }




  useEffect(() => {

    loadItems();

  }, []);





  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {


    const selected =
      event.target.files?.[0] ?? null;


    setFile(selected);



    if (selected) {

      setPreview(
        URL.createObjectURL(selected)
      );

    } else {

      setPreview("");

    }


  }






  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {


    event.preventDefault();


    if (!file) {

      setMessage(
        "Выбери файл"
      );

      return;

    }



    setIsLoading(true);
    setMessage("");



    try {


      const formData =
        new FormData();


      formData.append(
        "file",
        file
      );




      const uploadResponse =
        await fetch(
          "/api/fm/upload",
          {
            method:"POST",
            body:formData,
          }
        );



      const uploadData =
        await uploadResponse.json();





      if (!uploadResponse.ok) {

        setMessage(
          uploadData.error ||
          "Ошибка загрузки"
        );

        return;

      }





      const saveResponse =
        await fetch(
          "/api/fm",
          {
            method:"POST",

            headers:{
              "Content-Type":
              "application/json",
            },


            body:JSON.stringify({

              image_url:
              uploadData.image_url,

            }),

          }
        );





      if (!saveResponse.ok) {

        setMessage(
          "Ошибка сохранения"
        );

        return;

      }





      setMessage(
        "Скрин добавлен ❤️"
      );


      setFile(null);
      setPreview("");



      const input =
        document.getElementById(
          "fm-file"
        ) as HTMLInputElement | null;



      if(input){

        input.value="";

      }



      loadItems();




    } catch {


      setMessage(
        "Ошибка"
      );


    } finally {


      setIsLoading(false);


    }


  }







  async function deleteItem(
    id:number
  ){


    await fetch(
      "/api/fm",
      {

        method:"DELETE",

        headers:{
          "Content-Type":
          "application/json",
        },


        body:JSON.stringify({
          id,
        }),


      }
    );



    loadItems();


  }







  function getFileName(
    url:string
  ){

    return url
      .split("/")
      .pop();

  }







return (

<main className="
min-h-screen
px-4
py-10
">


<div className="
mx-auto
max-w-6xl
">



<h1 className="
text-5xl
font-black
">
FM 📸
</h1>



<p className="
mt-2
text-zinc-500
">
Управление скринами первых сообщений
</p>





<form
onSubmit={handleSubmit}
className="
mt-8
rounded-3xl
border
border-pink-200
bg-white/90
p-6
shadow-xl
"
>



<h2 className="
text-xl
font-black
text-pink-500
">
Загрузить скрин
</h2>





<label

htmlFor="fm-file"

className="
mt-5
flex
min-h-52
cursor-pointer
flex-col
items-center
justify-center
overflow-hidden
rounded-3xl
border-2
border-dashed
border-pink-300
bg-pink-50
p-5
"

>



{
preview ? (

<img

src={preview}

className="
max-h-44
rounded-2xl
object-contain
"

 />

)

:

(

<>

<div className="
text-5xl
">
☁️
</div>


<p className="
mt-3
font-bold
">
Нажми и выбери файл
</p>

</>

)

}



{
file && (

<div className="
mt-3
rounded-xl
bg-white
px-4
py-2
font-bold
text-pink-500
">

{file.name}

</div>

)

}



</label>




<input

id="fm-file"

type="file"

accept="image/*"

onChange={handleFileChange}

className="hidden"

/>





<button

disabled={isLoading}

className="
mt-5
rounded-2xl
bg-pink-400
px-6
py-3
font-bold
text-white
"

>

{
isLoading
?
"Загрузка..."
:
"Загрузить"
}

</button>




<p className="
mt-3
font-bold
text-pink-500
">
{message}
</p>




</form>







<div className="
mt-10
border-t
border-pink-200
pt-8
">


<div className="
flex
items-center
justify-between
">

<h2 className="
text-2xl
font-black
text-pink-500
">
Добавленные скрины
</h2>


<div className="
rounded-full
bg-pink-100
px-5
py-2
font-bold
text-pink-500
">
Всего: {items.length}
</div>


</div>







<div className="
mt-6
grid
gap-6
sm:grid-cols-2
lg:grid-cols-3
">





{
items.map(item=>(


<div

key={item.id}

className="
rounded-3xl
border
border-pink-200
bg-white
p-4
shadow-lg
transition
hover:-translate-y-1
"

>



<img

src={item.image_url}

className="
h-52
w-full
rounded-2xl
object-contain
bg-zinc-50
"

/>





<div className="
mt-4
rounded-2xl
bg-pink-50
p-3
">

<p className="
text-xs
font-black
uppercase
text-pink-400
">
Название файла
</p>



<p className="
mt-1
break-all
font-bold
text-zinc-800
">

{
getFileName(
item.image_url
)
}

</p>


</div>





<a

href={item.image_url}

target="_blank"

className="
mt-3
block
rounded-2xl
border
border-pink-200
py-3
text-center
font-bold
hover:bg-pink-50
"

>

Открыть полностью

</a>





<button

onClick={()=>
deleteItem(item.id)
}

className="
mt-3
w-full
rounded-2xl
bg-red-50
py-3
font-bold
text-red-400
hover:bg-red-100
"

>

Удалить

</button>





</div>


))

}





</div>


</div>





</div>


</main>

);


}