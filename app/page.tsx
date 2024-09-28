import { Message } from "./components/message";

export default function Home() {
  return (
    <section className="w-full h-screen bg-teal-50 flex items-center justify-center">
      <main className="border border-black rounded-lg p-5 min-w-96 flex flex-col items-center">
        <div className="w-full flex flex-1 flex-col gap-1">
          <Message content="Opa meu chapa quais cervejas estão geladinhas ai pra nois?" isFromYou />
          <Message content="Opa meu nobreza as cervejas mais geladas casa nesse momento são skol e brama"/>
          <Message content="E quanto que ta cada uma?" isFromYou />
          <Message content="Um copão de skoll de 500ml esta saindo por 5 e um copão de brama por 4"/>
        </div>
      </main>
    </section>
  );
}
