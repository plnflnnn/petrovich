export function confirmDelete(entity: "request" | "client", name: string) {
  const label = entity === "request" ? "заявку" : "клиента";

  return window.confirm(
    `Вы уверены, что хотите удалить ${label} «${name}»? Это действие нельзя отменить.`,
  );
}
