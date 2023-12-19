import {selectPending} from "../../general/store";


export function selectThemeInfo() {
  return (state) => {
    console.log('selectThemeInfo', state);
    return {
      isChecking: selectPending('theme')(state),
      main: state.theme.main,
      header: state.theme.header,
      skin: state.theme.skin,
      lng: state.theme.lng,
      rtl: state.theme.rtl,
      mobileView: state.theme.mobileView,
    }
  };
}
