import React from 'react';

import {
  AiOutlineException,
  AiOutlineAudit,
  AiOutlineCluster,
  AiOutlineExperiment,
} from 'react-icons/ai';

const Advantages = () => {
  return (
    <section className="section work">
      <div className="container">
        <ul class="work__ul">
          <li class="item">
            <AiOutlineException class="icon-work" />
            <h4 class="work_h4">УВАГА ДО ДЕТАЛЕЙ</h4>
            <p class="work_p">
              Ідейні міркування, і навіть початок повсякденної роботи з формування
              позиції.
            </p>
          </li>

          <li class="item">
            <AiOutlineExperiment class="icon-work" />
            <h4 class="work_h4">Організація екскурсій</h4>
            <p class="work_p">
              Може забезпечити організацію різноманітних екскурсій та розваг, що дозволить
              клієнтам максимально насолоджуватися своїм відпочинком.
            </p>
          </li>

          <li class="item">
            <AiOutlineAudit class="icon-work" />
            <h4 class="work_h4">Вигідні умови бронювання</h4>
            <p class="work_p">
              Ви може мати спеціальні умови для бронювання номерів в готелях, а також
              знижки та промокоди для своїх клієнтів.
            </p>
          </li>

          <li class="item">
            <AiOutlineCluster class="icon-work" />
            <h4 class="work_h4">Круглодобова підтримка</h4>
            <p class="work_p">
              Travel Agency може забезпечувати круглодобову підтримку своїм клієнтам, що
              дозволить швидко вирішувати будь-які проблеми.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Advantages;
