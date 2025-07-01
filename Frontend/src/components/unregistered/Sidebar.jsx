const Sidebar = ({ refSections }) => {
  const scrollHandler = (ref) => {
    if (ref?.current) {
      window.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" });
    }
  };

  return (
    <aside className="bg-[#003366] rotate-90 top-[400px] -left-[125px] fixed rounded-ss-2xl rounded-tr-2xl z-10">
      <button
        onClick={() => scrollHandler(refSections.Home)}
        className="text-white px-5 py-2 hover:rounded-ss-2xl hover:bg-[#1a4473]"
      >
        Home
      </button>
      <button
        onClick={() => scrollHandler(refSections.AboutUs)}
        className="text-white px-5 py-2 hover:bg-[#1a4473]"
      >
        About Us
      </button>
      <button
        onClick={() => scrollHandler(refSections.ContactUs)}
        className="text-white px-5 py-2 hover:rounded-se-2xl hover:bg-[#1a4473]"
      >
        Contact Us
      </button>
    </aside>
  );
};

export default Sidebar;
