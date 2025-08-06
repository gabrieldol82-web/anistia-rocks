import Link from "next/link";

export default function Members() {

    const members = [
        {
            "name": "Gabriel Dantas",
            "role": "Guitarra",
            "image": "/assets/capas/gabriel.jpg",
            "id": 1
        },
        {
            "name": "Rafa Melo",
            "role": "Vocal",
            "image": "/assets/capas/rafa.jpg",
            "id": 2
        },
        {
            "name": "Gutz Pedroza",
            "role": "Bateria",
            "image": "/assets/capas/gustavo.jpg",
            "id": 3
        },
        {
            "name": "Ana Calegari",
            "role": "Baixo",
            "image": "/assets/capas/ana.jpg",
            "id": 4
        }
    ];

  return (
   <div className="flex flex-wrap justify-center">
        {members.map(member => {
            return (
                <div key={member.id} className="sm:w-full md:w-1/2 p-4 flex flex-col items-center">
                    <img src={member.image} alt={member.name} className="w-auto h-96 rounded-2xl object-cover mb-4" />
                    <h2 className="text-xl font-semibold text-black">{member.name}</h2>
                    <p className="text-gray-600">{member.role}</p>
                    <Link href={`../members/${member.id}`} >
                        Ver mais sobre {member.name}
                    </Link>
                   
                </div>
            );
        })}
   </div>
  );
}