import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useUserActions } from "../hooks/useUsersActions";
import { useState } from "react";

export function CreateNewUser() {
  const { addUser } = useUserActions();
  const [result, setResult] = useState<'ok' | 'ko' | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setResult(null)

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const github = formData.get("github") as string;

    if (!name || !email || !github) {
      return setResult('ko')
    }

    addUser({ name, email, github });
    setResult('ok')
    form.reset()
  };

  return (
    <Card style={{ marginTop: "16px" }}>
      <Title>Create New User</Title>

      <form onSubmit={handleSubmit} className="">
        <TextInput name="name" placeholder="Aqui el nombre" />
        <TextInput name="email" placeholder="Aqui el email" />
        <TextInput name="github" placeholder="Aqui el usuario de github" />
        <div>
          <Button type="submit" style={{ marginTop: "16px" }}>
            Crear Usuario
          </Button>
          <span>
            {result === 'ok' && <Badge style={{ color:"green", marginLeft: "8px" }}>Guardado correctamente</Badge>}
            {result === 'ko' && <Badge style={{ color:"red", marginLeft: "8px" }}>Error con los campos</Badge>}
          </span>
        </div>
      </form>
    </Card>
  );
}
