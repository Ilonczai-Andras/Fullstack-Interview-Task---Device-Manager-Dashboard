const statuses = ['active', 'error', 'inactive'];

export default () => {
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
};