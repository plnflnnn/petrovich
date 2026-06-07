export function confirmDeleteRequest(name: string) {
  return window.confirm(
    `Вы уверены, что хотите удалить заявку «${name}»? Это действие нельзя отменить.`,
  );
}

export function confirmDeleteClient(name: string) {
  return window.confirm(
    `Вы уверены, что хотите удалить клиента «${name}»? Это действие нельзя отменить.`,
  );
}
