import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";

const ContactInfo = () => {
  return (
    <div>
      <div className="bg-[#0f6466] w-full mt-10 flex p-5">
        <div className="w-1/3 text-center text-white">
          <MdLocationOn className="rounded-full mx-auto text-white bg-[#008181] size-16 p-2" />
          <h3>Address</h3>
          <div className="mt-8">
            <p>University Of Gujrat</p>
          </div>
        </div>
        <div className="w-1/3 text-center text-white">
          <MdEmail className="rounded-full mx-auto text-white bg-[#008181] size-16 p-2" />
          <h3>Email</h3>
          <h4 className="mt-8">Personal Email:</h4>
          <div className="mt-5">
            <h5>Abdul Wahab</h5>
            <p>wahabtufail48@gmail.com</p>
          </div>
          <div className="mt-3">
            <h5>Muhammad Furqan Cheema</h5>
            <p>muhammadfurqancheema92@gmail.com</p>
          </div>
          <div className="mt-3">
            <h5>Muhammad Ahmad Butt</h5>
            <p>ahmedbutt880@gmail.com</p>
          </div>
          <h4 className="mt-8">UOG Email:</h4>
          <div className="mt-5">
            <h5>Abdul Wahab</h5>
            <p>21014119-006@uog.edu.pk</p>
          </div>
          <div className="mt-3">
            <h5>Muhammad Furqan Cheema</h5>
            <p>21014119-060@uog.edu.pk</p>
          </div>
          <div className="mt-3">
            <h5>Muhammad Ahmad Butt</h5>
            <p>21014119-047@uog.edu.pk</p>
          </div>
        </div>
        <div className="w-1/3 text-center text-white">
          <MdPhone className="rounded-full mx-auto text-white bg-[#008181] size-16 p-2" />
          <h3>Phone</h3>
          <div className="mt-8">
            <h5>Abdul Wahab</h5>
            <p>0307-6215204</p>
          </div>
          <div className="mt-3">
            <h5>Muhammad Furqan Cheema</h5>
            <p>0301-0700263</p>
          </div>
          <div className="mt-3">
            <h5>Muhammad Ahmad Butt</h5>
            <p>0310-3375198</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
