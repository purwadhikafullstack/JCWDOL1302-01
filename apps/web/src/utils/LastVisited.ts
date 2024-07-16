export const storeLastVisitedPage = () => {
  const currentPage = window.location.href;
  localStorage.setItem('lastVisitedPage', currentPage);
};
