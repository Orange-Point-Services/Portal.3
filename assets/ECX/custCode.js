String.format = function() {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i += 1) {
        var reg = new RegExp('\\{' + i + '\\}', 'gm');
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
};

function onSignIn() {
  var login    = $('#inputEmail').val(),
      password = $('#inputPassword').val();

  if (!login || !password) {
    alert("Please Insert Login AND Password");
    return;
  }
  sessionStorage.setItem("sLogin", login);

  var url = Config.siteUrl + "/Security.WebService/AuthenticationServiceRest.svc/login.post";

  $.ajax({
    url: url,
    type: 'POST',
    data: {
        u: login,
        p: password
    },
    success: function(response, status, xhr) {
      sessionStorage.setItem("sToken", response);
      swal({
          title : 'Success',
          text  : 'You have successfully logged in',
          timer : 1000,
          icon  : 'success',
          button: false
      });
      window.location.assign("index.html");
    },
    error: function(xhr) {
      swal({
          title : 'Warning',
          text  : 'Invalid User or Password - ' + xhr.errMsg,
          icon  : 'success',
          timer : 5000,
          button: true
      });
    }
  });
  return false;
}

// Top 4 Case Types Info (index.html)
function loadTopCaseTypesInfo() {
  var url     = String.format('{0}BDS.WebService/DataServiceRest.svc/post/{1}/ROOT_CUST_PRTL_GETTOTALBYCASETYPE', Config.siteUrl, Config.appBaseDomain);
  var vLogin  = sessionStorage.getItem("sLogin");  //     getCookieByName(Config.getCookieLoginName());
  var vToken  = sessionStorage.getItem("sToken");  //     getCookieByName(Config.getCookieTokenName());

  if (vToken) {
      url += '?t=' + vToken;
  } else {
      return;
  }

  // {"DATA":{"ROOT_CUST_PRTL_GETTOTALBYCASETYPE":{"ITEMS":[{"CASETYPE_NAME":"General Inquiry","CASETYPE_TOTAL":6},{"CASETYPE_NAME":"Complaint","CASETYPE_TOTAL":1}],"VALIDATION":null,"IsValid":true}}}
  $.ajax({
    dataType: 'text',
    url: url,
    type: 'POST',
    data: { login: vLogin },
    success: function(response) {
      response = getCorrectJSON(response);
// using sample data
      var jsonResponse = caseTypeInfo  // JSON.parse(response);
      if (jsonResponse && jsonResponse.ErrorCode === 500) {
          return;
      }
      var data        = jsonResponse.DATA['ROOT_CUST_PRTL_GETTOTALBYCASETYPE'],
          respSuccess = '';
      if (data) {
        respSuccess = data.ITEMS[0];
        var vCaseType1       = respSuccess.CASETYPE_TOTAL;
        var vCaseTypeName1   = respSuccess.CASETYPE_NAME;
        $("#cbCaseType1").html("<div class=\"text-uppercase text-primary font-weight-bold text-xs mb-1\">"+vCaseTypeName1+"</div><div class=\"text-dark font-weight-bold h5 mb-0\">"+vCaseType1+"</div>");
        respSuccess = data.ITEMS[1];
        var vCaseType2       = respSuccess.CASETYPE_TOTAL;
        var vCaseTypeName2   = respSuccess.CASETYPE_NAME;
        $("#cbCaseType2").html("<div class=\"text-uppercase text-primary font-weight-bold text-xs mb-1\">"+vCaseTypeName2+"</div><div class=\"text-dark font-weight-bold h5 mb-0\">"+vCaseType2+"</div>");
        respSuccess = data.ITEMS[2];
        var vCaseType3       = respSuccess.CASETYPE_TOTAL;
        var vCaseTypeName3   = respSuccess.CASETYPE_NAME;
        $("#cbCaseType3").html("<div class=\"text-uppercase text-primary font-weight-bold text-xs mb-1\">"+vCaseTypeName3+"</div><div class=\"text-dark font-weight-bold h5 mb-0\">"+vCaseType3+"</div>");
        respSuccess = data.ITEMS[3];
        var vCaseType4       = respSuccess.CASETYPE_TOTAL;
        var vCaseTypeName4   = respSuccess.CASETYPE_NAME;
        $("#cbCaseType4").html("<div class=\"text-uppercase text-primary font-weight-bold text-xs mb-1\">"+vCaseTypeName4+"</div><div class=\"text-dark font-weight-bold h5 mb-0\">"+vCaseType4+"</div>");
      }
    },
    error: function() {
      swal({
        title: 'Warning',
        text: 'Error Loading User Profile Data. Please contact your Administrator',
        type: 'warning'
      });
    }
  });
}
// Case Distribution by Priority (index.html)
function loadCaseDistribInfo() {
  var url = String.format('{0}BDS.WebService/DataServiceRest.svc/post/{1}/ROOT_CUST_PRTL_GETUSERINFO', Config.siteUrl, Config.appBaseDomain);
  var vLogin       = sessionStorage.getItem("sLogin");  //     getCookieByName(Config.getCookieLoginName());
  var vToken       = sessionStorage.getItem("sToken");  //     getCookieByName(Config.getCookieTokenName());

  if (vToken) {
      url += '?t=' + vToken;
  } else {
      return;
  }
  //{"DATA":{"ROOT_CUST_PRTL_SUMMARYINFO":{"ITEMS":[{"CASETYPE1":15,"CASETYPE2":5,"CASETYPE3":50,"CASETYPE4":20,"CRITICAL":20,"MAYOR":40,"NORMAL":120,"TRIVIAL":20,"MINOR":0,"CRITICAL_PCT":10,"MAYOR_PCT":20,"NORMAL_PCT":60,"TRIVIAL_PCT":20,"MINOR_PCT":0}],"VALIDATION":null,"IsValid":true}}}
  $.ajax({
    dataType: 'text',
    url: url,
    type: 'POST',
    data: { login: vLogin },
    success: function(response) {
      response = getCorrectJSON(response);
// using sample data
      var jsonResponse = caseTypeInfo  // JSON.parse(response);
      if (jsonResponse && jsonResponse.ErrorCode === 500) {
          return;
      }
      var data        = jsonResponse.DATA['ROOT_CUST_PRTL_GETTOTALBYCASETYPE'],
          respSuccess = '';
      if (data) {
        respSuccess = data.ITEMS[0];
        var vCaseType1       = respSuccess.CASETYPE_TOTAL;
        var vCaseTypeName1   = respSuccess.CASETYPE_NAME;
        $("#cbCaseType1").html("<div class=\"text-uppercase text-primary font-weight-bold text-xs mb-1\">"+vCaseTypeName1+"</div><div class=\"text-dark font-weight-bold h5 mb-0\">"+vCaseType1+"</div>");
        respSuccess = data.ITEMS[1];
        var vCaseType2       = respSuccess.CASETYPE_TOTAL;
        var vCaseTypeName2   = respSuccess.CASETYPE_NAME;
        $("#cbCaseType2").html("<div class=\"text-uppercase text-primary font-weight-bold text-xs mb-1\">"+vCaseTypeName2+"</div><div class=\"text-dark font-weight-bold h5 mb-0\">"+vCaseType2+"</div>");
        respSuccess = data.ITEMS[2];
        var vCaseType3       = respSuccess.CASETYPE_TOTAL;
        var vCaseTypeName3   = respSuccess.CASETYPE_NAME;
        $("#cbCaseType3").html("<div class=\"text-uppercase text-primary font-weight-bold text-xs mb-1\">"+vCaseTypeName3+"</div><div class=\"text-dark font-weight-bold h5 mb-0\">"+vCaseType3+"</div>");
        respSuccess = data.ITEMS[3];
        var vCaseType4       = respSuccess.CASETYPE_TOTAL;
        var vCaseTypeName4   = respSuccess.CASETYPE_NAME;
        $("#cbCaseType4").html("<div class=\"text-uppercase text-primary font-weight-bold text-xs mb-1\">"+vCaseTypeName4+"</div><div class=\"text-dark font-weight-bold h5 mb-0\">"+vCaseType4+"</div>");
//
        var vCritical    = respSuccess.CRITICAL;
        var vCriticalPct = respSuccess.CRITICAL_PCT;
        $("#pbCritical").html("Critical<span class=\"float-right\">"+vCritical+"</span>");
        $("#pbCriticalPct").html("<div class=\"progress-bar bg-danger\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: "+vCriticalPct+"%;\">"+vCriticalPct+"%</div>");
        var vMayor    = respSuccess.MAYOR;
        var vMayorPct = respSuccess.MAYOR_PCT;
        $("#pbMayor").html("Mayor<span class=\"float-right\">"+vMayor+"</span>");
        $("#pbMayorPct").html("<div class=\"progress-bar bg-warning\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: "+vMayorPct+"%;\">"+vMayorPct+"%</div>");
        var vNormal    = respSuccess.NORMAL;
        var vNormalPct = respSuccess.NORMAL_PCT;
        $("#pbNormal").html("Normal<span class=\"float-right\">"+vNormal+"</span>");
        $("#pbNormalPct").html("<div class=\"progress-bar bg-info\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: "+vNormalPct+"%;\">"+vNormalPct+"%</div>");
        var vTrivial    = respSuccess.TRIVIAL;
        var vTrivialPct = respSuccess.TRIVIAL_PCT;
        $("#pbTrivial").html("Trivial<span class=\"float-right\">"+vTrivial+"</span>");
        $("#pbTrivialPct").html("<div class=\"progress-bar bg-success\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: "+vTrivialPct+"%;\">"+vTrivialPct+"%</div>");
        var vMinor    = respSuccess.MINOR;
        var vMinorPct = respSuccess.MINOR_PCT;
        $("#pbMinor").html("Minor<span class=\"float-right\">"+vMinor+"</span>");
        $("#pbMinorPct").html("<div class=\"progress-bar bg-success\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: "+vMinorPct+"%;\">"+vMinorPct+"%</div>");
      }
    },
    error: function() {
      swal({
        title: 'Warning',
        text: 'Error Loading User Profile Data. Please contact your Administrator',
        type: 'warning'
      });
    }
  });
}
// Load User Profile Data (profile.html)
function loadUserProfileData() {
  var url = String.format('{0}BDS.WebService/DataServiceRest.svc/post/{1}/ROOT_CUST_PRTL_GETUSERINFO', Config.siteUrl, Config.appBaseDomain);
  var vLogin       = sessionStorage.getItem("sLogin");  //     getCookieByName(Config.getCookieLoginName());
  var vToken       = sessionStorage.getItem("sToken");  //     getCookieByName(Config.getCookieTokenName());
  $("#iUserName").val(vLogin);

  if (vToken) {
      url += '?t=' + vToken;
  } else {
      return;
  }
  //{"DATA":{"ROOT_CUST_PRTL_SUMMARYINFO":{"ITEMS":[{"CASETYPE1":15,"CASETYPE2":5,"CASETYPE3":50,"CASETYPE4":20,"CRITICAL":20,"MAYOR":40,"NORMAL":120,"TRIVIAL":20,"MINOR":0,"CRITICAL_PCT":10,"MAYOR_PCT":20,"NORMAL_PCT":60,"TRIVIAL_PCT":20,"MINOR_PCT":0}],"VALIDATION":null,"IsValid":true}}}
  $.ajax({
    dataType: 'text',
    url: url,
    type: 'POST',
    data: { login: vLogin },
    success: function(response) {
      response = getCorrectJSON(response);
// using sample data
      var jsonResponse = userInfo  // JSON.parse(response);
      if (jsonResponse && jsonResponse.ErrorCode === 500) {
          return;
      }
      var data        = jsonResponse.DATA['ROOT_CUST_PRTL_GETUSERINFO'],
          respSuccess = '';
      if (data) {
        respSuccess = data.ITEMS[0];
        console.log("lastLogin= " + respSuccess.USR_LASTLOGINDATE);
        var vFirstName = respSuccess.USR_FIRSTNAME;
        var vLastName  = respSuccess.USR_LASTNAME;
        var vEMail     = respSuccess.USR_EMAIL;
        var vPhone     = respSuccess.USR_PHONE;
        var vFullName  = respSuccess.USR_NAME;

        $("#iUserName").val(vLogin);
        $("#iBarFullName").html("<span class=\"d-none d-lg-inline mr-2 text-gray-600 small\">"+ vFullName +"</span><img class=\"border rounded-circle img-profile\" src=\"assets/img/eccentex%20hat.png?h=6279900a87d137fab84ac2a23167f84a\">");
        $("#iFirstName").val(vFirstName);
        $("#iLastName").val(vLastName);
//
        //$("#lastLogin").text(respSuccess.USR_LASTLOGINDATE);
        $("#iEMail").val(vEMail);
        $("#iPhone").val(vPhone)
        $("#iAddress").val(respSuccess.EP_ADDRESS);
        $("#iCity").val(respSuccess.EP_CITY);
        $("#iState").val(respSuccess.EP_STATE);
      }
    },
    error: function() {
      swal({
        title: 'Warning',
        text: 'Error Loading User Profile Data. Please contact your Administrator',
        type: 'warning'
      });
    }
  });
}


// Old Functions

function onSearchCaseData() {
    var txtCaseSearchCaseNumber = document.getElementById('txtCaseSearchCaseNumber'),
        txtCaseSearchResult = document.getElementById('txtCaseSearchResult');

    if (txtCaseSearchCaseNumber.value) {

        var url = String.format('{0}BDS.WebService/DataServiceRest.svc/post/{1}/{2}', Config.siteUrl, Config.appBaseDomain, Config.caseSearchRule),
            token = getCookieByName(Config.getCookieTokenName());

        if (token) {
            url += '?t=' + token;
        } else {
            setTokenExpires();
            return;
        }

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'text',
            data: {
                'CaseId': txtCaseSearchCaseNumber.value
            },
            success: function(response) {
                response = getCorrectJSON(response);

                var jsonResponse = JSON.parse(response);

                if (jsonResponse && jsonResponse.ErrorCode === 500) {
                    //                    setTokenExpires();
                    return;
                }

                if (jsonResponse && jsonResponse.DATA) {
                    var data = jsonResponse.DATA[Config.caseSearchRule],
                        items = data ? data.ITEMS : null;

                    if (items && items.length > 0) {
                        if (items.length === 1) {
                            var caseStateName = items[0].CASESTATE_NAME,
                                caseId = items[0].CASEID;

                            if (caseStateName || caseId) {
                                txtCaseSearchResult.value = String.format('{0} status: {1}', caseId, caseStateName);
                            } else {
                                txtCaseSearchResult.value = 'Data was not found';
                            }
                        } else {
                            txtCaseSearchResult.value = 'More than one case found. Please specify case number (full match)';
                        }
                    } else {
                        txtCaseSearchResult.value = 'Data was not found';
                    }
                } else {
                    txtCaseSearchResult.value = 'Data was not found';
                }
            },
            error: function(xhr, error) {
                swal({
                    title: 'Warning',
                    text: 'Error on Search Case Data. Please contact your administrator',
                    type: 'warning'
                });
            }
        });

    } else {
        swal({
            title: 'Warning',
            text: 'Please specify case number',
            type: 'warning'
        });
    }

}

function getFormattedDate(date) {
    var month = date.getMonth() + 1,
        day = date.getDate(),
        year = date.getFullYear();

    if (month < 10) {
        month = '0' + month;
    }

    if (day < 10) {
        day = '0' + day;
    }

    return day + '/' + month + '/' + year;
}

function getCorrectJSON(response) {
    response = response.replace(/new Date\(-*[0-9]+\)/g, function replacer(str, offset, s) {
        var date = new Date(parseInt(str.replace(/^\D+/g, ''))),
            fDate = getFormattedDate(date);

        return '"' + fDate + '"';
    });
    return response;
}

function saveLoginIntoCookie(login) {
    var dtNow = new Date(),
        time  = dtNow.getTime() + 3600 * 1000; // plus 1 hour
    dtNow.setTime(time);

    sessionStorage.setItem("sLogin", login);
    // create cookies
    document.cookie = Config.getCookieLoginName() + '=' + login + '; expires=' + dtNow.toUTCString() + ';';
}

function saveTokenIntoCookie(token) {
    var dtNow = new Date(),
        time = dtNow.getTime() + 3600 * 1000; // plus 1 hour
    dtNow.setTime(time);
    sessionStorage.setItem("sToken", token);
    // create cookies
    document.cookie = Config.getCookieTokenName() + '=' + token + '; expires=' + dtNow.toUTCString() + ';';
}

function removeTokenFromCookie() {
    document.cookie = Config.getCookieTokenName() + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = Config.getCookieLoginName() + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getCookieByName(cookieName) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(cookieName + '=');
        if (c_start != -1) {
            c_start = c_start + cookieName.length + 1;
            var c_end = document.cookie.indexOf(';', c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return decodeURI(document.cookie.substring(c_start, c_end));
        }
    }
    return '';
}

function loadUserCases(extPtyID) {
    var url = String.format('{0}BDS.WebService/DataServiceRest.svc/post/{1}/{2}', Config.siteUrl, Config.appBaseDomain, Config.caseSearchRule),
        //token = getCookieByName(Config.getCookieTokenName());
        token = sessionStorage.getItem("sToken");
    if (!token || !extPtyID) {
        return;
    }
    url += '?t=' + token;

//{"DATA":{"root_DCM_SearchCases":{"RETVAL":"-1","ERRORMESSAGE":null,"ERRORCODE":null,"TOTALCOUNT":"1",
//"ITEMS":[{"CASEFROM":null,"CASEID":"CASE-2020-579","CASESTATE_ID":3,"CASESTATE_ISASSIGN":0,"CASESTATE_ISFINISH":0,"CASESTATE_ISFIX":0,"CASESTATE_ISRESOLVE":0,"CASESTATE_ISSTART":0,"CASESTATE_NAME":"In Process","CASESTATE_ISINPROCESS":0,"CASESTATE_ISDEFAULTONCREATE":0,"CASESYSTYPE_CODE":"PAYMENT_REQUEST","CASESYSTYPE_COLORCODE":"333333","CASESYSTYPE_ICONCODE":"eur","CASESYSTYPE_ID":21,"CASESYSTYPE_NAME":"Payment Request","CASESYSTYPE_USEDATAMODEL":1,"CASESYSTYPE_ISDRAFTMODEAVAIL":0,"MS_STATENAME":"Intake Processing","MS_STATECOLORCODE":"FFE0B2","MS_STATETEXTCOLORCODE":"EF6C00","GOALSLAEVENTTYPEID":1,"GOALSLAEVENTTYPECODE":"GOAL","GOSLSLAEVENTTYPENAME":"Goal","GOALSLADURATION":171430000,"DLINESLAEVENTTYPEID":2,"DLINESLAEVENTTYPECODE":"DEADLINE","DLINESLAEVENTTYPENAME":"Deadline","DLINESLADURATION":13030000,"COL_ID":579,"CREATEDBY":"93A4C70CC4B128E2E0532408000CA29F","CLOSEDBY":null,"DATECLOSED":null,"DESCRIPTION":null,"DRAFT":0,"EXTSYSID":null,"ID":579,"INTEGTARGET_ID":null,"MANUALDATERESOLVED":null,"MANUALWORKDURATION":null,"OWNER_CASEWORKER_NAME":"Finance Team","PRIORITY_ID":4,"PRIORITY_NAME":"Major","PRIORITY_VALUE":75,"RESOLUTIONCODE_CODE":null,"RESOLUTIONCODE_ICON":null,"RESOLUTIONCODE_ID":null,"RESOLUTIONCODE_NAME":null,"RESOLUTIONCODE_THEME":null,"RESOLUTIONDESCRIPTION":null,"SUMMARY":"Payment Request sent from Portal","WORKBASKET_ID":62,"WORKBASKET_NAME":"Finance Team","WORKBASKET_TYPE_CODE":"PERSONAL","WORKBASKET_TYPE_NAME":"Personal","WORKITEM_ACTIVITY":"root_CS_STATUS_DEFAULT_CASE_IN_PROCESS","WORKITEM_ID":null,"WORKITEM_WORKFLOW":null,"PERM_CASETYPE_DETAIL":1,"PERM_CASETYPE_MODIFY":1,"CREATEDBY_NAME":"Tadeusz Sherman","CREATEDDURATION":185831000,"MODIFIEDBY_NAME":"System User System User","MODIFIEDDURATION":171416000,"CLOSEDBY_NAME":null,"CLOSEDDURATION":null,"CUSTOMDATA":null,"TASK_ID":null,"DESIGNERPAGE_ID":null}],
//"ValidationSummary":{"VALIDATION":null,"IsValid":true}}}}

    $("#gridUserCases").jsGrid({
        width: "90%",
        inserting: false,
        editing: false,
        sorting: false,
        paging: true,
        pageSize: 5,
        autoload: true,
        controller: {
            loadData: function() {
                var d = $.Deferred();
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: {
                        ExternalPartyIds: extPtyID,
                        sort: 'ID',
                        dir: 'DESC'
                    },
                    dataType: 'text',
                    success: function(response) {
                        response = getCorrectJSON(response);
                        var jsonResponse = JSON.parse(response);
                        if (jsonResponse && jsonResponse.DATA) {
                            var data = jsonResponse.DATA[Config.caseSearchRule],
                                items = data ? data.ITEMS : null,
                                parsedData = [];
                            for (var i = 0, len = items.length; i < len; i++) {
                                parsedData.push({
                                    'Case #': items[i].CASEID,
                                    'Type': items[i].CASESYSTYPE_NAME,
                                    'Summary': items[i].SUMMARY,
                                    // changed to Milestine State = MS_STATENAME
                                    'Status': items[i].MS_STATENAME,       
                                    'Created Date': items[i].CREATEDDATE,
                                    'CASEID': items[i].ID
                                });
                            }
                            if (parsedData && (parsedData.length > 0)) {
                                d.resolve(parsedData);
                            } else {
                                d.resolve(null);
                            }
                        } else {
                            if (jsonResponse && jsonResponse.ErrorCode === 500) {
                                //                                setTokenExpires();
                            }
                            d.resolve(null);
                        }
                    },
                    failure: function(errMsg) {
                        alert(errMsg);
                    },
                    error: function(xhr, error) {
                        swal({
                            title: 'Warning',
                            text: 'Error Loading User Cases. Please contact your administrator',
                            type: 'warning'
                        });
                    }
                });
                return d.promise();
            }
        },
        rowClick: function(args) {
            var item = args.item,
                caseNumber = item['Case #'],
                caseId = item['CASEID'];
            if (caseId) {
                swal({
                        title: "Confirmation",
                        text: "Do you want open " + caseNumber + ' case?',
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Yes",
                        closeOnConfirm: true
                    },
                    function(isConfirm) {
                        if (isConfirm) {
                            var url = String.format('{0}Ecx.Web/en-US/do/root_UTIL_BasePage?Case_Id={1}&d={2}&{3}', Config.siteUrl, caseId, Config.appBaseDomain, Config.getCaseDetailPageParams()),
                                token = getCookieByName(Config.getCookieTokenName());

                            if (token) {
                                url += '&t=' + token;
                            } else {
                                setTokenExpires();
                                return;
                            }

                            window.open(url);
                        }
                    });
            }
        },
        fields: [
            { name: "Case #", type: "text", width: 200 },
            { name: "Type", type: "text", width: 200 },
            { name: "Summary", type: "text", width: 350 },
            { name: "Created Date", type: "text", width: 100 },
            { name: "Status", type: "text", width: 100 }
        ]
    });

}

//Load User Info
function loadUserInformation() {
//    var login = getCookieByName(Config.getCookieLoginName());
    var login = sessionStorage.getItem("sLogin");

    if (!login) return;

    var url = String.format('{0}Security.WebService/AdministrationServiceRest.svc/users/{1}/login/l?login={2}', Config.siteUrl, Config.appBaseTokenSystemDomain, login);
//    var token = getCookieByName(Config.getCookieTokenName());
    var token = sessionStorage.getItem("sToken");

    if (token) {
        url += '&t=' + token;
    } else {
        return;
    }

    $.ajax({
        url: url,
        dataType: 'text',
        type: 'GET',
        data: {},
        success: function(response) {
          if (response && response.ErrorCode === 500) {
            return;
          }
          var vUserName = document.getElementById('iUserName'),
              //remove json items without quotes
              response = getCorrectJSON(response);
          var jsonResp = JSON.parse(response);
          if (jsonResp && jsonResp.User && jsonResp.User.length > 0) {
            var userData = jsonResp.User[0];
            if (userData) {
              //GET USER PROFILE DATA
              vUserName.value = userData.Name;
            //userData.UserId && loadUserProfileData(userData);
              userData.UserId && loadUserProfileData(userData.UserId);
            }
          }
        },
        error: function(xhr, error) {
          swal({
            title: 'Warning',
            text: 'loadUserInformation Error. Please contact your administrator',
            type: 'warning'
          });
        }
    });
}

//Load User Profile Data
function loadSummaryInfo() {
  var url = String.format('{0}BDS.WebService/DataServiceRest.svc/post/{1}/ROOT_CUST_PRTL_GETUSERINFO', Config.siteUrl, Config.appBaseDomain);
  var vLogin       = sessionStorage.getItem("sLogin");  //     getCookieByName(Config.getCookieLoginName());
  var vToken       = sessionStorage.getItem("sToken");  //     getCookieByName(Config.getCookieTokenName());

  if (vToken) {
      url += '?t=' + vToken;
  } else {
      return;
  }
  //{"DATA":{"ROOT_CUST_PRTL_SUMMARYINFO":{"ITEMS":[{"CASETYPE1":15,"CASETYPE2":5,"CASETYPE3":50,"CASETYPE4":20,"CRITICAL":20,"MAYOR":40,"NORMAL":120,"TRIVIAL":20,"MINOR":0,"CRITICAL_PCT":10,"MAYOR_PCT":20,"NORMAL_PCT":60,"TRIVIAL_PCT":20,"MINOR_PCT":0}],"VALIDATION":null,"IsValid":true}}}
  $.ajax({
    dataType: 'text',
    url: url,
    type: 'POST',
    data: { login: vLogin },
    success: function(response) {
      response = getCorrectJSON(response);
// using sample data
      var jsonResponse = summaryInfo  // JSON.parse(response);
      if (jsonResponse && jsonResponse.ErrorCode === 500) {
          return;
      }
      var data        = jsonResponse.DATA['ROOT_CUST_PRTL_SUMMARYINFO'],
          respSuccess = '';
      if (data) {
        respSuccess = data.ITEMS[0];
//
        var vCaseType1       = respSuccess.CASETYPE1;
        var vCaseTypeName1   = respSuccess.CASETYPE1_NAME;
        $("#cbCaseType1").html("<div class=\"text-uppercase text-primary font-weight-bold text-xs mb-1\">"+vCaseTypeName1+"</div><div class=\"text-dark font-weight-bold h5 mb-0\">"+vCaseType1+"</div>");
        var vCaseType2       = respSuccess.CASETYPE2;
        var vCaseTypeName2   = respSuccess.CASETYPE2_NAME;
        $("#cbCaseType2").html("<div class=\"text-uppercase text-primary font-weight-bold text-xs mb-1\">"+vCaseTypeName2+"</div><div class=\"text-dark font-weight-bold h5 mb-0\">"+vCaseType2+"</div>");
        var vCaseType3       = respSuccess.CASETYPE3;
        var vCaseTypeName3   = respSuccess.CASETYPE3_NAME;
        $("#cbCaseType3").html("<div class=\"text-uppercase text-primary font-weight-bold text-xs mb-1\">"+vCaseTypeName3+"</div><div class=\"text-dark font-weight-bold h5 mb-0\">"+vCaseType3+"</div>");
        var vCaseType4       = respSuccess.CASETYPE4;
        var vCaseTypeName4   = respSuccess.CASETYPE4_NAME;
        $("#cbCaseType4").html("<div class=\"text-uppercase text-primary font-weight-bold text-xs mb-1\">"+vCaseTypeName4+"</div><div class=\"text-dark font-weight-bold h5 mb-0\">"+vCaseType4+"</div>");
//
        var vCritical    = respSuccess.CRITICAL;
        var vCriticalPct = respSuccess.CRITICAL_PCT;
        $("#pbCritical").html("Critical<span class=\"float-right\">"+vCritical+"</span>");
        $("#pbCriticalPct").html("<div class=\"progress-bar bg-danger\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: "+vCriticalPct+"%;\">"+vCriticalPct+"%</div>");
        var vMayor    = respSuccess.MAYOR;
        var vMayorPct = respSuccess.MAYOR_PCT;
        $("#pbMayor").html("Mayor<span class=\"float-right\">"+vMayor+"</span>");
        $("#pbMayorPct").html("<div class=\"progress-bar bg-warning\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: "+vMayorPct+"%;\">"+vMayorPct+"%</div>");
        var vNormal    = respSuccess.NORMAL;
        var vNormalPct = respSuccess.NORMAL_PCT;
        $("#pbNormal").html("Normal<span class=\"float-right\">"+vNormal+"</span>");
        $("#pbNormalPct").html("<div class=\"progress-bar bg-info\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: "+vNormalPct+"%;\">"+vNormalPct+"%</div>");
        var vTrivial    = respSuccess.TRIVIAL;
        var vTrivialPct = respSuccess.TRIVIAL_PCT;
        $("#pbTrivial").html("Trivial<span class=\"float-right\">"+vTrivial+"</span>");
        $("#pbTrivialPct").html("<div class=\"progress-bar bg-success\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: "+vTrivialPct+"%;\">"+vTrivialPct+"%</div>");
        var vMinor    = respSuccess.MINOR;
        var vMinorPct = respSuccess.MINOR_PCT;
        $("#pbMinor").html("Minor<span class=\"float-right\">"+vMinor+"</span>");
        $("#pbMinorPct").html("<div class=\"progress-bar bg-success\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: "+vMinorPct+"%;\">"+vMinorPct+"%</div>");
      }
    },
    error: function() {
      swal({
        title: 'Warning',
        text: 'Error Loading User Profile Data. Please contact your Administrator',
        type: 'warning'
      });
    }
  });
}
