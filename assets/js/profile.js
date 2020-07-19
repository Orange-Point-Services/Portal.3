String.format = function() {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i += 1) {
        var reg = new RegExp('\\{' + i + '\\}', 'gm');
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
};

/* Calls when token expires */
function setTokenExpires() {
    authControl('noauth');
    swal({
        title: 'Warning',
        text: 'Set Token Expired. You are not authorized for this action',
        type: 'warning'
    });
}

function logOutAction() {
    removeTokenFromCookie();
    window.location.assign("./login.html");    
}

function onSignInAction() {
    var login    = $('#inputEmail').val(),
        password = $('#inputPassword').val();
    
    if (!login || !password) {
        alert("Please insert login AND password");
        return;
    }
    sessionStorage.setItem("sLogin", login);
    var url = String.format('{0}Security.WebService/AuthenticationServiceRest.svc/login.post', Config.siteUrl);
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            u: login,
            p: password
        },
        success: function(token) {
            alert("Sucessfull login...");
            saveTokenIntoCookie(token);
            saveLoginIntoCookie(login);
            sessionStorage.setItem("sToken", token);
            loadUserCases(122);
            window.location.replace("./index.html");
        },
        error: function(xhr, error) {
            alert(error);
        }
    });
    return false;
}

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
        time = dtNow.getTime() + 3600 * 1000; // plus 1 hour

    dtNow.setTime(time);

    // create cookies
    document.cookie = Config.getCookieLoginName() + '=' + login + '; expires=' + dtNow.toUTCString() + ';';
}

function saveTokenIntoCookie(token) {
    var dtNow = new Date(),
        time = dtNow.getTime() + 3600 * 1000; // plus 1 hour

    dtNow.setTime(time);

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
function loadUserProfileData() {
    var url = String.format('{0}BDS.WebService/DataServiceRest.svc/post/{1}/ROOT_CUST_PRTL_GETUSERINFO', Config.siteUrl, Config.appBaseDomain);
    var vLogin    = sessionStorage.getItem("sLogin");  //     getCookieByName(Config.getCookieLoginName());
    var vToken    = sessionStorage.getItem("sToken");  //     getCookieByName(Config.getCookieTokenName());
    $("#iUserName").val(vLogin);
    console.log("vLogin : " + vLogin);
  
    var txtExtPartyID      = document.getElementById('txtExtPartyID');
    var txtAccountFullName = document.getElementById('txtAccountFullName');
    var txtAccountEmail    = document.getElementById('txtAccountEmail');
    var txtAccountPhone    = document.getElementById('txtAccountPhone');

    if (vToken) {
        url += '?t=' + vToken;
    } else {
        return;
    }

// // {"DATA":{"ROOT_CUST_PRTL_GETUSERINFO":
// {"ITEMS":[
//   {"USR_EMAIL":"tsherman@eccentex.com",
//    "USR_PHONE":"1-949-235-9009","USR_NAME":"Tadeusz Sherman","USR_FIRSTNAME":"Tadeusz","USR_LASTNAME":"Sherman","USR_LASTLOGINDATE":1589230156000,"EP_ID":1,"PPL_EPAUPREPLYADDRESS":"rklusek1/domyslna","PPL_EMAIL2":"ttnow@live.com"}
//  ],"VALIDATION":null,"IsValid":true}}}

    $.ajax({
        dataType: 'text',
        url: url,
        type: 'POST',
        data: { login: vLogin },
        success: function(response) {
            response = getCorrectJSON(response);
//            console.log("response : "+response);
            var jsonResponse = JSON.parse(response);
            if (jsonResponse && jsonResponse.ErrorCode === 500) {
                return;
            }

            var data        = jsonResponse.DATA['ROOT_CUST_PRTL_GETUSERINFO'],
                respSuccess = '';
//            console.log("DATA "+data);
            if (data) {
                respSuccess = data.ITEMS[0];
                txtExtPartyID.value       = respSuccess.EP_ID;
                txtAccountFullName.value  = respSuccess.USR_NAME;
                txtAccountEmail.value     = respSuccess.USR_EMAIL;
                txtAccountPhone.value     = respSuccess.USR_PHONE;
                $("#txtPesel").val(respSuccess.PPL_PESEL);
                $("#lastLogin").text(respSuccess.USR_LASTLOGINDATE);
                console.log("EP= "+ respSuccess.EP_ID);
                console.log("lastLogin= "+ respSuccess.USR_LASTLOGINDATE);
            }
        },
        error: function(xhr, error) {
            swal({
                title: 'Warning',
                text: 'Loading User Profile Error. Please contact your Administrator',
                type: 'warning'
            });
        }
    });
}