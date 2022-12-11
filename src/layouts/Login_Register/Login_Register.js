import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../store/action";
import SwitchLanguage from "../../SwitchLanguage";
import { languages } from "../../utils/constant";
import ListLanguage from "../../components/ListLanguage";
import Tippy from "../../components/Tippy/Tippy";
import { path } from "../../utils/constant";
import Button from "../../components/Button/Button";

import "./Login_Register.scss";

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    (function () {
      function ready(fn) {
        if (document.readyState !== "loading") {
          fn();
        } else {
          document.addEventListener("DOMContentLoaded", fn);
        }
      }

      function makeSnow(el) {
        var ctx = el.getContext("2d");
        var width = 0;
        var height = 0;
        var particles = [];
        var Particle = function () {
          this.x = this.y = this.dx = this.dy = 0;
          this.reset();
        };

        Particle.prototype.reset = function () {
          this.y = Math.random() * height;
          this.x = Math.random() * width;
          this.dx = Math.random() * 1 - 0.5;
          this.dy = Math.random() * 0.5 + 0.5;
        };

        function createParticles(count) {
          if (count !== particles.length) {
            particles = [];
            for (var i = 0; i < count; i++) {
              particles.push(new Particle());
            }
          }
        }

        function onResize() {
          width = window.innerWidth;
          height = window.innerHeight;
          el.width = width;
          el.height = height;
          createParticles((width * height) / 10000);
        }

        function updateParticles() {
          ctx.clearRect(0, 0, width, height);
          ctx.fillStyle = "#f6f9fa";
          particles.forEach(function (particle) {
            particle.y += particle.dy;
            particle.x += particle.dx;
            if (particle.y > height) {
              particle.y = 0;
            }

            if (particle.x > width) {
              particle.reset();
              particle.y = 0;
            }

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 5, 0, Math.PI * 2, false);
            ctx.fill();
          });
          window.requestAnimationFrame(updateParticles);
        }

        onResize();
        updateParticles();
        window.addEventListener("resize", onResize);
      }

      ready(function () {
        var canvas = document.getElementById("snow");
        makeSnow(canvas);
      });
    })();
  }

  render() {
    let { children } = this.props;

    return (
      <>
        <div className="content">
          <canvas className="snow" id="snow"></canvas>
          <div className="ground">
            <div className="mound">
              <div className="mound_spade"></div>
            </div>
          </div>
        </div>

        <div className="bgr-default-login grid">
          <div className="grid wide">
            <div className="row">
              <div className="l-12">
                <div className="menu-nav">
                  <div>
                    <Tippy
                      content={<SwitchLanguage id="manageAdmin.language" />}
                    >
                      <ListLanguage />
                    </Tippy>
                  </div>
                  <div className="menu-btn">
                    <Button
                      type={
                        window.location &&
                        window.location.pathname &&
                        window.location.pathname === path.REGISTERPAGE
                          ? "primary"
                          : "close-transparent"
                      }
                      to={path.REGISTERPAGE}
                      content={<SwitchLanguage id="manageAdmin.btnRGT" />}
                    />
                    <Button
                      type={
                        window.location &&
                        window.location.pathname &&
                        window.location.pathname === path.LOGINPAGE
                          ? "primary"
                          : "close-transparent"
                      }
                      to={path.LOGINPAGE}
                      content={<SwitchLanguage id="manageAdmin.btnLG" />}
                    />
                  </div>
                </div>
              </div>

              <div className="l-12">
                <div className="wraper-form">
                  <>{children}</>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
