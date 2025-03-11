import React from 'react';

const FaqPage = () => {
  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <strong>How to add another miner software like ccminer?</strong>
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            Go to the website, download the ccminer software, unzip it, and copy it to the 'miningsource' folder.
          </div>
        </div>
      </div>

      <div className="accordion-item mt-3 border-top">
        <h2 className="accordion-header" id="headingTwo">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            <strong>If I want someone else to manage my machines, what should I do?</strong>
          </button>
        </h2>
        <div
          id="collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            Just share your key with this person, and they will be able to control your machines.
          </div>
        </div>
      </div>


      <div className="accordion-item mt-3 border-top">
        <h2 className="accordion-header" id="heading3">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse3"
            aria-expanded="false"
            aria-controls="collapse3"
          >
            <strong>What if I have a problem? Who should I contact?</strong>
          </button>
        </h2>
        <div
          id="collapse3"
          className="accordion-collapse collapse"
          aria-labelledby="heading3"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            If you encounter any issues or have any questions, feel free to reach out by sending an email to <a href="mailto:miningfundassist@gmail.com">miningfundassist@gmail.com</a>, and we will get back to you as soon as possible to assist you with your concern.
          </div>
        </div>
      </div>
      
      <div className="accordion-item mt-3 border-top">
        <h2 className="accordion-header" id="heading4">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse4"
            aria-expanded="false"
            aria-controls="collapse4"
          >
            <strong>If I have any questions or concerns, how can I reach you?</strong>
          </button>
        </h2>
        <div
          id="collapse4"
          className="accordion-collapse collapse"
          aria-labelledby="heading4"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            You can contact us by sending an email to <a href="mailto:miningfundassist@gmail.com">miningfundassist@gmail.com</a>, and we will be happy to assist you.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
