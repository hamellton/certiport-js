import './scss/style.scss';
import 'bootstrap';
import $ from 'jquery';

// import './js/fondy';

// develop
// const PORT = 8050;
// const SERVER = 'http://localhost';

// prod
const PORT = 8050;
const SERVER = 'http://ftp.dinternal.com.ua';

const URL = `${SERVER}:${PORT}/api/register/`;
const URLlevels = `${SERVER}:${PORT}/api/get/exams`;
const URLlevelPrice = `${SERVER}:${PORT}/api/get/exams/id`;
// const URLPormoPricePercentage = `${SERVER}:${PORT}/api/get/promo/id`;
const URLCenters = `${SERVER}:${PORT}/api/get/centers`;
const URLCities = `${SERVER}:${PORT}/api/get/cities`;
const URLContract = `${SERVER}:${PORT}/api/get/contract/id`;

// for testing localhost
// const URL = 'http://localhost:8000/api/register/';
// const URLlevels = 'http://localhost:8000/api/get/levels';
// const URLlevelPrice = 'http://localhost:8000/api/get/levels/id';
// const URLCenters = 'http://localhost:8000/api/get/centers';
// const URLCities = 'http://localhost:8000/api/get/cities';
// const URLContract = 'http://localhost:8000/api/get/contract/id';

const hideElements = () => {
  $('#success').hide();
};

const getLevels = () => {
  $.ajax({
    type: 'GET',
    url: URLlevels,
  }).done((res) => {
    console.log(res);
    const selectLevels = $('#exam, #levelless');
    $(res).each((e) => {
      selectLevels.append($('<option>').attr('value', res[e].ID).text(res[e].name));
    });
  }).fail((err) => {
    console.log(`fail: ${err}`);
  });
};

const getCentersAll = () => {
  $.ajax({
    type: 'GET',
    url: URLCenters,
  }).done((res) => {
    console.log(res);
    const selectCenters = $('#centermore, #centerless');
    $(res).each((e) => {
      selectCenters.append($('<option>').attr('value', res[e].code).text(`${res[e].name} (${res[e].city})`));
    });
  }).fail((err) => {
    console.log(`fail: ${err}`);
  });
};

const getCities = () => {
  $.ajax({
    type: 'GET',
    url: URLCities,
  }).done((res) => {
    console.log(res);
    const selectCities = $('#citymore, #cityless');
    $(res).each((e) => {
      selectCities.append($('<option>').attr('value', res[e].city).text(`${res[e].city}`));
    });
  }).fail((err) => {
    console.log(`fail: ${err}`);
  });
};

const formInit = () => {
  $('#costless, #cost').val(0);
  $('#promo').val(0);
  getCities();
  getLevels();
  getCentersAll();
  hideElements();
};


// Example starter JavaScript for disabling form submissions if there are invalid fields
$(document).ready(() => {
  formInit();

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.getElementsByClassName('needs-validation');
  // Loop over them and prevent submission
  // eslint-disable-next-line no-unused-vars
  const validation = Array.prototype.filter.call(forms, (form) => {
    form.addEventListener('submit', (event) => {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // jquery ajax chain
  const getContractID = (levelID) => $.ajax({ type: 'POST', url: URLlevelPrice, data: { id: levelID } });
  const getContractContent = (level) => $.ajax({ type: 'POST', url: URLContract, data: { id: level.contract_id } });
  const updateContractContent = (contract) => {
    $('.contract').html('Оберіть, будь ласка іспит');
    $('.contract').html(contract.text);
    return contract.ID;
  };
  const updateInputContractForm = (ID) => {
    $('#contract').val(ID);
    $('#contractless').val(ID);
  };
  const pasteFullNameMore = () => {
    const name = $('#name').val();
    const lastName = $('#lname').val();
    const temp = $('.contract').html().replace('IVANOV IVAN', `${name} ${lastName}`);
    $('.contract').html(temp);
  };
  const pasteExam = () => {
    const exam = $('#exam option:selected').text();
    const temp = $('.contract').html().replace('___exam___', `"${exam}"`);
    $('.contract').html(temp);
  };
  const pasteFullNameLess = () => {
    const name = $('#firstnameless').val();
    const lastName = $('#lastnameless').val();
    const temp = $('.contract').html().replace('IVANOV IVAN', `${name} ${lastName}`);
    $('.contract').html(temp);
  };

  $('#exam').change((e) => {
    $.ajax({
      type: 'POST',
      url: URLlevelPrice,
      data: {
        id: e.target.value,
      },
    }).done((res) => {
      getContractID(e.target.value)
        .then(getContractContent)
        .then(updateContractContent)
        .then(updateInputContractForm)
        .then(pasteFullNameMore)
        .then(pasteExam);
      $('#cost').val(res.price);
      console.log('test');
      const selectCert = $('#exam').val();
      console.log(selectCert);
      if (selectCert === '2') {
        document.querySelector('#cert2').className = 'hide';
        document.querySelector('#cert3').className = 'hide';
        document.querySelector('#cert4').className = 'hide';
        document.querySelector('#cert5').className = 'hide';
        document.querySelector('#cert6').className = 'hide';
        document.querySelector('#cert7').className = 'hide';
        document.querySelector('#cert8').className = 'hide';
        document.querySelector('#cert9').className = 'hide';
        document.querySelector('#cert10').className = 'hide';
        document.querySelector('#cert11').className = 'hide';
        document.querySelector('#cert12').className = 'hide';
        document.querySelector('#cert1').className = 'show';
      } else if (selectCert === '3') {
        document.querySelector('#cert1').className = 'hide';
        document.querySelector('#cert3').className = 'hide';
        document.querySelector('#cert4').className = 'hide';
        document.querySelector('#cert5').className = 'hide';
        document.querySelector('#cert6').className = 'hide';
        document.querySelector('#cert7').className = 'hide';
        document.querySelector('#cert8').className = 'hide';
        document.querySelector('#cert9').className = 'hide';
        document.querySelector('#cert10').className = 'hide';
        document.querySelector('#cert11').className = 'hide';
        document.querySelector('#cert12').className = 'hide';
        document.querySelector('#cert2').className = 'show';
      } else if (selectCert === '4') {
        document.querySelector('#cert1').className = 'hide';
        document.querySelector('#cert2').className = 'hide';
        document.querySelector('#cert4').className = 'hide';
        document.querySelector('#cert5').className = 'hide';
        document.querySelector('#cert6').className = 'hide';
        document.querySelector('#cert7').className = 'hide';
        document.querySelector('#cert8').className = 'hide';
        document.querySelector('#cert9').className = 'hide';
        document.querySelector('#cert10').className = 'hide';
        document.querySelector('#cert11').className = 'hide';
        document.querySelector('#cert12').className = 'hide';
        document.querySelector('#cert3').className = 'show';
      } else if (selectCert === '5') {
        document.querySelector('#cert1').className = 'hide';
        document.querySelector('#cert2').className = 'hide';
        document.querySelector('#cert3').className = 'hide';
        document.querySelector('#cert5').className = 'hide';
        document.querySelector('#cert6').className = 'hide';
        document.querySelector('#cert7').className = 'hide';
        document.querySelector('#cert8').className = 'hide';
        document.querySelector('#cert9').className = 'hide';
        document.querySelector('#cert10').className = 'hide';
        document.querySelector('#cert11').className = 'hide';
        document.querySelector('#cert12').className = 'hide';
        document.querySelector('#cert4').className = 'show';
      } else if (selectCert === '7') {
        document.querySelector('#cert1').className = 'hide';
        document.querySelector('#cert2').className = 'hide';
        document.querySelector('#cert3').className = 'hide';
        document.querySelector('#cert4').className = 'hide';
        document.querySelector('#cert6').className = 'hide';
        document.querySelector('#cert7').className = 'hide';
        document.querySelector('#cert8').className = 'hide';
        document.querySelector('#cert9').className = 'hide';
        document.querySelector('#cert10').className = 'hide';
        document.querySelector('#cert11').className = 'hide';
        document.querySelector('#cert12').className = 'hide';
        document.querySelector('#cert5').className = 'show';
      } else if (selectCert === '8') {
        document.querySelector('#cert1').className = 'hide';
        document.querySelector('#cert2').className = 'hide';
        document.querySelector('#cert3').className = 'hide';
        document.querySelector('#cert4').className = 'hide';
        document.querySelector('#cert5').className = 'hide';
        document.querySelector('#cert7').className = 'hide';
        document.querySelector('#cert8').className = 'hide';
        document.querySelector('#cert9').className = 'hide';
        document.querySelector('#cert10').className = 'hide';
        document.querySelector('#cert11').className = 'hide';
        document.querySelector('#cert12').className = 'hide';
        document.querySelector('#cert6').className = 'show';
      } else if (selectCert === '12') {
        document.querySelector('#cert1').className = 'hide';
        document.querySelector('#cert2').className = 'hide';
        document.querySelector('#cert3').className = 'hide';
        document.querySelector('#cert4').className = 'hide';
        document.querySelector('#cert5').className = 'hide';
        document.querySelector('#cert6').className = 'hide';
        document.querySelector('#cert8').className = 'hide';
        document.querySelector('#cert9').className = 'hide';
        document.querySelector('#cert10').className = 'hide';
        document.querySelector('#cert11').className = 'hide';
        document.querySelector('#cert12').className = 'hide';
        document.querySelector('#cert7').className = 'show';
      } else if (selectCert === '13') {
        document.querySelector('#cert1').className = 'hide';
        document.querySelector('#cert2').className = 'hide';
        document.querySelector('#cert3').className = 'hide';
        document.querySelector('#cert4').className = 'hide';
        document.querySelector('#cert5').className = 'hide';
        document.querySelector('#cert6').className = 'hide';
        document.querySelector('#cert7').className = 'hide';
        document.querySelector('#cert7').className = 'hide';
        document.querySelector('#cert9').className = 'hide';
        document.querySelector('#cert10').className = 'hide';
        document.querySelector('#cert11').className = 'hide';
        document.querySelector('#cert12').className = 'hide';
        document.querySelector('#cert8').className = 'show';
      } else if (selectCert === '14') {
        document.querySelector('#cert1').className = 'hide';
        document.querySelector('#cert2').className = 'hide';
        document.querySelector('#cert3').className = 'hide';
        document.querySelector('#cert4').className = 'hide';
        document.querySelector('#cert5').className = 'hide';
        document.querySelector('#cert6').className = 'hide';
        document.querySelector('#cert7').className = 'hide';
        document.querySelector('#cert8').className = 'hide';
        document.querySelector('#cert7').className = 'hide';
        document.querySelector('#cert8').className = 'hide';
        document.querySelector('#cert10').className = 'hide';
        document.querySelector('#cert11').className = 'hide';
        document.querySelector('#cert12').className = 'hide';
        document.querySelector('#cert9').className = 'show';
      } else if (selectCert === '15') {
        document.querySelector('#cert1').className = 'hide';
        document.querySelector('#cert2').className = 'hide';
        document.querySelector('#cert3').className = 'hide';
        document.querySelector('#cert4').className = 'hide';
        document.querySelector('#cert5').className = 'hide';
        document.querySelector('#cert6').className = 'hide';
        document.querySelector('#cert7').className = 'hide';
        document.querySelector('#cert8').className = 'hide';
        document.querySelector('#cert9').className = 'hide';
        document.querySelector('#cert11').className = 'hide';
        document.querySelector('#cert12').className = 'hide';
        document.querySelector('#cert10').className = 'show';
      } else if (selectCert === '16') {
        document.querySelector('#cert1').className = 'hide';
        document.querySelector('#cert2').className = 'hide';
        document.querySelector('#cert3').className = 'hide';
        document.querySelector('#cert4').className = 'hide';
        document.querySelector('#cert5').className = 'hide';
        document.querySelector('#cert6').className = 'hide';
        document.querySelector('#cert7').className = 'hide';
        document.querySelector('#cert8').className = 'hide';
        document.querySelector('#cert9').className = 'hide';
        document.querySelector('#cert10').className = 'hide';
        document.querySelector('#cert12').className = 'hide';
        document.querySelector('#cert11').className = 'show';
      } else if (selectCert === '17') {
        document.querySelector('#cert1').className = 'hide';
        document.querySelector('#cert2').className = 'hide';
        document.querySelector('#cert3').className = 'hide';
        document.querySelector('#cert4').className = 'hide';
        document.querySelector('#cert5').className = 'hide';
        document.querySelector('#cert6').className = 'hide';
        document.querySelector('#cert7').className = 'hide';
        document.querySelector('#cert8').className = 'hide';
        document.querySelector('#cert9').className = 'hide';
        document.querySelector('#cert10').className = 'hide';
        document.querySelector('#cert11').className = 'hide';
        document.querySelector('#cert12').className = 'show';
      }
    }).fail((err) => {
      console.log(`fail get price: ${err}`);
    });
  });
  $('#promo-btn').click(() => {
    const promoText = {
      certiport: {
        certiport_ua: 'certiport-ua',
        pearsonpartners: 'pearsonpartners',
        mos2411: 'MOS2411',
        TESTCENTRE2021: 'TESTCENTRE2021',
        certiport50: 'certiport50',
      },
      discount: {
        certiport: 10,
        pearsonpartners: 50,
        mos2411: 100,
        testcentre2021: 50,
        certiport50: 50,
      },
    };
    const promoCode = $('#promo-code').val();
    const examPromo = $('#exam').val();
    // const promo = {
    //   promocode: 'certiport-ua',
    //   discount_percentage: 10,
    // };
    // console.log('UI', promoCode);
    // console.log('Back', promo.promocode);
    if (promoCode === promoText.certiport.certiport_ua) {
      const cost = $('#cost').val();
      let promoCost = 0;
      promoCost = (cost !== 0) ? cost - ((cost / 100) * promoText.discount.certiport) : 0;
      $('#promo').val(promoCost);
    } else if (promoCode === promoText.certiport.pearsonpartners && examPromo === '4') {
      const cost = $('#cost').val();
      let promoCost = 0;
      promoCost = (cost !== 0) ? cost - ((cost / 100) * promoText.discount.pearsonpartners) : 0;
      $('#promo').val(promoCost);
    } else if (promoCode === promoText.certiport.TESTCENTRE2021 && examPromo === '4') {
      const cost = $('#cost').val();
      let promoCost = 0;
      promoCost = (cost !== 0) ? cost - ((cost / 100) * promoText.discount.testcentre2021) : 0;
      $('#promo').val(promoCost);
    } else if (promoCode === promoText.certiport.mos2411 && examPromo === '2') {
      const cost = $('#cost').val();
      let promoCost = 0;
      promoCost = (cost !== 0) ? cost - ((cost / 100) * promoText.discount.mos2411) : 0;
      $('#promo').val(promoCost);
      $('#cost').val(0);
      // console.log('done');
    } else if (promoCode === promoText.certiport.certiport50 && examPromo === '3') {
      const cost = $('#cost').val();
      let promoCost = 0;
      promoCost = (cost !== 0) ? cost - ((cost / 100) * promoText.discount.certiport50) : 0;
      $('#promo').val(promoCost);
    } else if (promoCode === promoText.certiport.certiport50 && examPromo === '2') {
      const cost = $('#cost').val();
      let promoCost = 0;
      promoCost = (cost !== 0) ? cost - ((cost / 100) * promoText.discount.certiport50) : 0;
      $('#promo').val(promoCost);
    } else if (promoCode === promoText.certiport.certiport50 && examPromo === '7') {
      const cost = $('#cost').val();
      let promoCost = 0;
      promoCost = (cost !== 0) ? cost - ((cost / 100) * promoText.discount.certiport50) : 0;
      $('#promo').val(promoCost);
    } else if (promoCode === promoText.certiport.certiport50 && examPromo === '8') {
      const cost = $('#cost').val();
      let promoCost = 0;
      promoCost = (cost !== 0) ? cost - ((cost / 100) * promoText.discount.certiport50) : 0;
      $('#promo').val(promoCost);
    } else if (promoCode === promoText.certiport.certiport50 && examPromo === '17') {
      const cost = $('#cost').val();
      let promoCost = 0;
      promoCost = (cost !== 0) ? cost - ((cost / 100) * promoText.discount.certiport50) : 0;
      $('#promo').val(promoCost);
    } else {
      $('#promo').val(0);
    }
    // TODO Исправить обращение к базе через ендпоинт
    // $.ajax({
    //   type: 'POST',
    //   url: URLPormoPricePercentage,
    //   data: {
    //     id: promoCode,
    //   },
    // }).done((res) => {
    //   // getContractID(e.target.value)
    //   //   .then(getContractContent)
    //   //   .then(updateContractContent)
    //   //   .then(updateInputContractForm)
    //   //   .then(pasteFullNameLess);

    //   $('#promo').val(res.percentage);
    // }).fail((err) => {
    //   console.log(`fail get promo: ${err}`);
    // });
  });

  // $('#promo-code').change((e) => {
  //   let promoCode = $('#promo-code').val();
  //   $.ajax({
  //     type: 'GET',
  //     url: URLPormoPricePercentage,
  //     data: {
  //       id: promoCode,
  //     },
  //   }).done((res) => {
  //     getContractID(e.target.value)
  //       .then(getContractContent)
  //       .then(updateContractContent)
  //       .then(updateInputContractForm)
  //       .then(pasteFullNameLess);

  //     $('#promo').val(res.percentage);
  //   }).fail((err) => {
  //     console.log(`fail get price: ${err}`);
  //   });
  // });
  $('#levelless').change((e) => {
    $.ajax({
      type: 'POST',
      url: URLlevelPrice,
      data: {
        id: e.target.value,
      },
    }).done((res) => {
      getContractID(e.target.value)
        .then(getContractContent)
        .then(updateContractContent)
        .then(updateInputContractForm)
        .then(pasteFullNameLess);

      $('#costless').val(res.price);
    }).fail((err) => {
      console.log(`fail get price: ${err}`);
    });
  });
  $('#citymore').change((e) => {
    $.ajax({
      type: 'POST',
      url: URLCities,
      data: {
        name: e.target.value,
      },
    }).done((res) => {
      const selectCenters = $('#centermore');
      selectCenters.empty();
      $(res).each((el) => {
        selectCenters.append($('<option>').attr('value', res[el].code).text(`${res[el].name} (${res[el].city})`));
      });
    }).fail((err) => {
      console.log(`fail get cities: ${err}`);
    });
  });
  $('#promo').change((e) => {
    $.ajax({
      type: 'POST',
      url: URLCities,
      data: {
        name: e.target.value,
      },
    }).done((res) => {
      const selectCenters = $('#promo');
      selectCenters.empty();
      $(res).each((el) => {
        selectCenters.append($('<option>').attr('value', res[el].code).text(`${res[el].promo}`));
      });
    }).fail((err) => {
      console.log(`fail get cities: ${err}`);
    });
  });
  $('#cityless').change((e) => {
    $.ajax({
      type: 'POST',
      url: URLCities,
      data: {
        name: e.target.value,
      },
    }).done((res) => {
      const selectCenters = $('#centerless');
      selectCenters.empty();
      $(res).each((el) => {
        selectCenters.append($('<option>').attr('value', res[el].code).text(`${res[el].name} (${res[el].city})`));
      });
    }).fail((err) => {
      console.log(`fail get cities: ${err}`);
    });
  });
}, false);

// fondy
// eslint-disable-next-line no-unused-vars
const createOrderLink = (amount, orderDesc) => {
  // eslint-disable-next-line no-undef
  const button = $ipsp.get('button');
  button.setMerchantId(1397120);
  button.setAmount(amount, 'UAH', true);
  button.setResponseUrl('http://www.test.FONDY.eu');
  button.setHost('api.fondy.eu');
  // button.addField({
  //   label: 'Послуга',
  //   name: 'order_desc',
  //   value: orderDesc,
  // });
  return button.getUrl();
};


$('#form-more, #form-less, #testtest').submit((e) => {
  e.preventDefault(); // disallow form which refresh page
  e.stopPropagation();
  const form = $(e.currentTarget); // e.currentTarget use this instead for arrow function
  console.log(form.serialize());
  // console.log(e.currentTarget);

  $.ajax({
    type: 'POST',
    url: URL,
    data: form.serialize(),
  }).done((res) => {
    if (res.status === 'email exist') {
      alert('email exist');
    } else {
      $('#success, #form-more').toggle();
      // добавить кнопку для оплаты (заглушка)
      // const btn = $('<a>', { text: 'Сплатити', href: createOrderLink(1000) });
      // $(btn).appendTo('#paymentmore');
      // $('#paymentless, #paymentmore').append(btn);
      // --добавить кнопку для оплаты (заглушка)--
      console.log(Object.keys(res));
      $('.number').html(res.number);
      $('.firstname, .firstnamemore').html(res.name);
      $('.secondname, .secondnamemore').html(res.lname);
      $('.email, .emailmore').html(res.email);
      $('.phone, .phonemore').html(res.phone);
      $('.price, .pricemore').html(res.total);
      $('.fee, .feemore').html(res.fee);
      $('.total, .totalmore').html(res.totalfeesumm);
    }

    // console.log(`success ${res}`);
  }).fail((err) => {
    console.log(`fail: ${err}`);
  });
  e.stopImmediatePropagation(); // dissalow send form twice
  return false;
});
