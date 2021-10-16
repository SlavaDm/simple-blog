/**
 * The function for setting buttons for pagination.
 * @param setButtonsArray callback for change buttons array with pagination.
 * @param currentPage number of the current page.
 * @param allPages count of the all pages.
 */
export const setPagination = (
  setButtonsArray: React.Dispatch<React.SetStateAction<number[]>>,
  currentPage: number,
  allPages: number
) => {
  if (allPages > 0) {
    if (allPages < 3) {
      setButtonsArray(
        [1, 2, 3].slice(0, allPages - 1).map((num) => {
          return num;
        })
      );
    } else {
      if (currentPage === allPages) {
        setButtonsArray([currentPage - 2, currentPage - 1, currentPage]);
      } else if (currentPage === 1) {
        setButtonsArray([currentPage, currentPage + 1, currentPage + 2]);
      } else {
        setButtonsArray([currentPage - 1, currentPage, currentPage + 1]);
      }
    }
  }
};
