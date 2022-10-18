export const postEvent  = async (event:string, body: any) => {
    const resp = await fetch(`/api/${event}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };