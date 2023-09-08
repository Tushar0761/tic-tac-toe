const xSymbol = `<i class="fa-regular fa-o" style="color: #5492ff;"></i>`;
const oSymbol = `<i style="color:#ff5454;" class="fa-solid fa-x"></i>`;
let sAry = [xSymbol, oSymbol];

let oplayer = true;
let valueArr = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

$("#edit1").click(function (e) {
  $("#name1").attr({ disabled: false }).focus().val("");
  $("#name1").blur(function () {
    if ($("#name1").val() == "") {
      $("#name1").val("Name 1");
    }
    $("#name1").attr({ disabled: true });
  });
});
$("#edit2").click(function () {
  $("#name2").attr({ disabled: false }).focus().val("");
  $("#name2").blur(function () {
    if ($("#name2").val() == "") {
      $("#name2").val("Name 2");
    }
    $("#name2").attr({ disabled: true });
  });
});

function initGame() {
  valueArr = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  $("td").text("");
  $(".winmsg").hide();
  $(".board").css({ opacity: 1 });
  $(".msg span").text("");
  oplayer = true;
}

function isFilled(position) {
  if (valueArr[position[0] - 1][position[1] - 1]) {
    return true;
  }
  if (oplayer) valueArr[position[0] - 1][position[1] - 1] = 1;
  else valueArr[position[0] - 1][position[1] - 1] = 2;

  return false;
}

function isWin() {
  let checkNumber = oplayer ? 1 : 2;

  for (let i = 0; i < 3; i++) {
    if (
      valueArr[i][0] == valueArr[i][1] &&
      valueArr[i][2] == valueArr[i][1] &&
      valueArr[i][0] == checkNumber
    ) {
      return true;
    }
  }
  for (let i = 0; i < 3; i++) {
    if (
      valueArr[0][i] == valueArr[1][i] &&
      valueArr[1][i] == valueArr[2][i] &&
      valueArr[0][i] == checkNumber
    ) {
      return true;
    }
  }
  if (
    valueArr[0][0] == valueArr[1][1] &&
    valueArr[2][2] == valueArr[1][1] &&
    valueArr[0][0] == checkNumber
  ) {
    return true;
  } else if (
    valueArr[0][2] == valueArr[1][1] &&
    valueArr[2][0] == valueArr[1][1] &&
    valueArr[1][1] == checkNumber
  )
    return true;
}

function putMark(e, markO) {
  let mark = markO ? sAry[0] : sAry[1];
  console.log(e);

  $(e).html(mark);
  console.log(e);
  $(e).animate({ scale: 1.2 }, "fast").animate({ scale: 1 }, "fast");
}

$("td").hover(
  function () {
    $(this).css("background-color", "#c0c5ce");
  },
  function () {
    $(this).css("background-color", "");
  }
);

$("td").click(function (e) {
  if (isFilled($(e.target).attr("id").split(" "))) {
    return;
  }
  if (oplayer) {
    putMark(this, oplayer);
    this.innerHTML = sAry[0];
    if (isWin()) {
      $(".msg span").text(`${$("#name1").val()} won`);
      $(".winmsg").show("fast");
      $(".board").animate({ opacity: 0.5 }, "fast");
      return;
    }
    oplayer = false;
  } else {
    putMark(this, oplayer);

    if (isWin()) {
      $(".msg span").text(`${$("#name2").val()} won`);
      $(".winmsg").show("fast");

      $(".board").animate({ opacity: 0.5 }, "fast");
      return;
    }
    oplayer = true;
  }

  if (
    !(
      valueArr[0].includes(0) ||
      valueArr[1].includes(0) ||
      valueArr[2].includes(0)
    )
  ) {
    $(".winmsg").show("fast", () => {
      $(".msg span").text(`Match is Tied`);
    });
    $(".board").animate({ opacity: 0.5 }, "fast");
  }

  // position($(e.target).attr("id"))
});

let resize = function () {
  if (window.innerWidth < 700) {
    $(".last").hide();
  } else {
    $(".last").show("fast");
  }
};
$(document).ready(resize);

window.onresize = resize;
