"use client";

import { useEffect, useState } from "react";

type Person = {
  id: number;
  name: string;
  avatar: string;
  expires_at?: string;
};


export default function AdminStandikPage() {

  const [people,setPeople] = useState<Person[]>([]);

  const [name,setName] = useState("");
  const [file,setFile] = useState<File|null>(null);

  const [edit,setEdit] = useState<Person|null>(null);

  const [editName,setEditName] = useState("");
  const [editFile,setEditFile] = useState<File|null>(null);


  async function loadPeople(){

    const res = await fetch("/api/standik");

    const data = await res.json();

    if(Array.isArray(data)){
      setPeople(data);
    }

  }


  useEffect(()=>{
    loadPeople();
  },[]);



  function daysLeft(date?:string){

    if(!date){
      return 45;
    }


    const diff =
      new Date(date).getTime()
      -
      Date.now();


    return Math.ceil(
      diff /
      (1000*60*60*24)
    );

  }



  async function addPerson(){

    if(!name || !file){
      return;
    }


    const form = new FormData();

    form.append("name",name);
    form.append("file",file);


    await fetch("/api/standik",{
      method:"POST",
      body:form
    });


    setName("");
    setFile(null);

    loadPeople();

  }




  async function extendPerson(id:number){

    await fetch("/api/standik",{

      method:"PATCH",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({
        id
      })

    });


    loadPeople();

  }




  async function deletePerson(id:number){

    await fetch("/api/standik",{

      method:"DELETE",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({
        id
      })

    });


    loadPeople();

  }




  function openEdit(person:Person){

    setEdit(person);
    setEditName(person.name);
    setEditFile(null);

  }




  async function saveEdit(){

    if(!edit){
      return;
    }


    const form = new FormData();


    form.append(
      "id",
      String(edit.id)
    );


    form.append(
      "name",
      editName
    );


    if(editFile){

      form.append(
        "file",
        editFile
      );

    }



    await fetch("/api/standik",{

      method:"PATCH",

      body:form

    });


    setEdit(null);

    loadPeople();

  }





  const expiring =
    people.filter(
      p =>
      daysLeft(p.expires_at)<=5
    );




  return (

    <div className="max-w-3xl mx-auto p-6">


      {
        expiring.length>0 && (

          <div
            className="
            mb-6
            rounded-2xl
            border
            border-red-300
            bg-red-50
            p-4
            "
          >

            <div
              className="
              font-black
              text-red-500
              "
            >
              🔥 Скоро заканчиваются
            </div>


            <div className="mt-2 space-y-1">

            {
              expiring.map(p=>(

                <div
                  key={p.id}
                  className="
                  text-sm
                  text-red-600
                  "
                >
                  {p.name}
                  {" — "}
                  осталось {daysLeft(p.expires_at)} дней
                </div>

              ))
            }

            </div>


          </div>

        )
      }





      <div
        className="
        rounded-3xl
        bg-white
        border
        border-pink-200
        p-5
        mb-6
        "
      >


        <input
          value={name}
          onChange={
            e=>setName(e.target.value)
          }
          placeholder="Ник"
          className="
          w-full
          rounded-xl
          border
          p-3
          mb-3
          "
        />


        <input
          type="file"
          accept="image/*"
          onChange={
            e=>
            setFile(
              e.target.files?.[0] ?? null
            )
          }
        />


        <button
          onClick={addPerson}
          className="
          mt-4
          w-full
          rounded-xl
          bg-pink-400
          text-white
          py-3
          font-bold
          "
        >
          Добавить ♡
        </button>


      </div>





      <div className="space-y-3">


      {
        people.map(person=>(


          <div
            key={person.id}

            className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-pink-200
            bg-white
            p-2
            "
          >


            <img
              src={person.avatar}
              className="
              h-10
              w-10
              rounded-full
              object-cover
              "
            />


            <div className="flex-1">


              <div
                className="
                font-bold
                "
              >
                {person.name}
              </div>


              <div
                className={
                  daysLeft(person.expires_at)<=5
                  ?
                  "text-xs text-red-500 font-bold"
                  :
                  "text-xs text-zinc-400"
                }
              >

                ⏳ {daysLeft(person.expires_at)} дней

              </div>


            </div>





            <button
              onClick={
                ()=>extendPerson(person.id)
              }
              className="
              h-8
              w-8
              rounded-lg
              bg-green-400
              text-white
              "
            >
              +
            </button>



            <button
              onClick={
                ()=>openEdit(person)
              }
              className="
              h-8
              w-8
              rounded-lg
              bg-pink-300
              "
            >
              ✏️
            </button>



            <button
              onClick={
                ()=>deletePerson(person.id)
              }
              className="
              h-8
              w-8
              rounded-lg
              bg-red-400
              text-white
              "
            >
              🗑
            </button>


          </div>


        ))
      }


      </div>





      {
        edit && (

          <div
            className="
            fixed
            inset-0
            bg-black/40
            flex
            items-center
            justify-center
            "
          >

            <div
              className="
              bg-white
              rounded-3xl
              p-6
              w-80
              "
            >

              <h2 className="font-black mb-4">
                Изменить ник
              </h2>


              <input
                value={editName}
                onChange={
                  e=>setEditName(e.target.value)
                }
                className="
                w-full
                border
                rounded-xl
                p-3
                "
              />


              <input
                type="file"
                accept="image/*"
                className="mt-3"
                onChange={
                  e=>
                  setEditFile(
                    e.target.files?.[0] ?? null
                  )
                }
              />


              <button
                onClick={saveEdit}
                className="
                mt-4
                w-full
                rounded-xl
                bg-pink-400
                text-white
                py-3
                "
              >
                Сохранить
              </button>


              <button
                onClick={
                  ()=>setEdit(null)
                }
                className="
                mt-2
                w-full
                rounded-xl
                bg-zinc-200
                py-3
                "
              >
                Закрыть
              </button>


            </div>

          </div>

        )
      }



    </div>

  );

}